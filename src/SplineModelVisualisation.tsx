import React, { useEffect, useState } from "react";
import { getCSVData } from "./GetCSVData";
import { DataPoint } from "./DataPoint";
import ScatterPlot, { createScaleFunctions } from "./ScatterPlot";
import { calculatePriceRanges } from "./CalculatePriceRanges";
import { Circle, Line } from '@visx/shape';

export function SplineModelVisualisation() {
    const [data, setData] = useState<DataPoint[]>([]);

    useEffect(() => {
        getCSVData().then(setData)
    }, []);

    const { xScale, yScale } = createScaleFunctions({
        height: 800,
        width: 800,
        data: data.map(({ price, area }) => ({ x: area, y: price }))
    });

    let ranges = Array.from(calculatePriceRanges(data, 7));

    // sort the ranges based on midX value
    ranges.sort((a, b) => ((a[0].split('-').map(Number)[0] + a[0].split('-').map(Number)[1]) / 2) - ((b[0].split('-').map(Number)[0] + b[0].split('-').map(Number)[1]) / 2));

    return (
        <ScatterPlot
            data={data.map(({ price, area }) => ({ x: area, y: price }))}
            width={800}
            height={800}
        >
            {ranges.map(([range, [minPrice, maxPrice, avgPrice]], i) => {
                const [minX, maxX] = range.split('-').map(Number);
                const midX = (minX + maxX) / 2; // midpoint for placing the circle
                const x = xScale(midX);
                const y = yScale(avgPrice);

                return (
                    <React.Fragment key={`range-${i}`}>
                        <Circle
                            cx={x}
                            cy={y}
                            r={5} // radius
                            fill="red"
                        />
                        {i < ranges.length - 1 &&
                            <Line
                                from={{ x, y }}
                                to={{ x: xScale((ranges[i + 1][0].split('-').map(Number)[0] + ranges[i + 1][0].split('-').map(Number)[1]) / 2), y: yScale(ranges[i + 1][1][2]) }}
                                stroke="red"
                            />
                        }
                    </React.Fragment>
                );
            })}
        </ScatterPlot>
    )
}
