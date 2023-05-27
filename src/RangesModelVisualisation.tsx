import React, {useEffect, useState} from "react";
import {getCSVData} from "./GetCSVData";
import {DataPoint} from "./DataPoint";
import ScatterPlot, {createScaleFunctions} from "./ScatterPlot";
import {calculatePriceRanges} from "./CalculatePriceRanges";

export function RangesModelVisualisation() {
    const [data, setData] = useState<DataPoint[]>([]);
    useEffect(() => {
        getCSVData().then(setData)
    }, []);

    const {xScale, yScale} = createScaleFunctions({
        height: 800,
        width: 800,
        data: data.map(({price, area}) => ({x: area, y: price}))
    });
    let ranges = Array.from(calculatePriceRanges(data, 7));

    return <ScatterPlot data={data.map(({price, area}) => ({x: area, y: price}))} width={800} height={800}>
        {ranges.map(([range, [minPrice, maxPrice]], i) => {
            const [minX, maxX] = range.split('-').map(Number);
            const x = xScale(minX);
            const y = yScale(maxPrice);
            const width = xScale(maxX) - xScale(minX);
            const height = yScale(minPrice) - yScale(maxPrice);
            return (
                <rect
                    key={`range-${i}`}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="rgba(0, 0, 255, 0.2)" // Transparent blue color
                />
            );
        })}
    </ScatterPlot>
}
