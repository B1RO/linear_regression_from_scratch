import React, {useEffect, useState} from "react";
import {getCSVData} from "./GetCSVData";
import {DataPoint} from "./DataPoint";
import ScatterPlot, {createScaleFunctions} from "./ScatterPlot";

export function LinearRelationshipModelVisualisation() {
    const [data, setData] = useState<DataPoint[]>([]);
    useEffect(() => {
        getCSVData().then(setData);
    }, []);

    const {xScale, yScale} = createScaleFunctions({
        height: 800,
        width: 800,
        data: data.map(({price, area}) => ({x: area, y: price})),
    });

    const lines = Array.from({length: 15}, (_, i) => {
        const slope = Math.random()*4-3; // Random slope between -1 and 1
        const x1 = xScale.invert(0)
        const y1 = yScale.invert(800)
        const x2 = xScale.invert(800); // Calculate x-coordinate at width 800
        const y2 = yScale.invert(slope * 800); // Calculate y-coordinate based on the slope
        return {x1: x1, y1: y1, x2, y2, slope};
    });

    return (
        <ScatterPlot
            data={data.map(({price, area}) => ({x: area, y: price}))}
            width={800}
            height={800}
        >
            {lines.map(({x1, y1, x2, y2, slope}, i) => (
                <line
                    key={`line-${i}`}
                    x1={xScale(x1)}
                    y1={yScale(y1)}
                    x2={xScale(x2)}
                    y2={yScale(y2)}
                    stroke="red"
                    strokeWidth={2}
                />
            ))}
        </ScatterPlot>
    );
}
