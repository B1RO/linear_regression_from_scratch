import React, {useEffect, useState} from "react";
import {getCSVData} from "./GetCSVData";
import {DataPoint} from "./DataPoint";
import ScatterPlot, {createScaleFunctions} from "./ScatterPlot";
import {LinePath, Line} from '@visx/shape';
import styled from "styled-components";
function calculateMAE(data: any, slope: any) {
    // @ts-ignore
    const sum = data.reduce((total, {price, area}) => total + Math.abs(price - slope * area), 0);
    return sum / data.length;
}


function calculateOpacity(x1 : number, y1 : number, x2 : number, y2 : number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lineLength = Math.sqrt(dx * dx + dy * dy);
    return (lineLength / 2000); // Adjust the scaling factor as needed
}

export function MAEVisualisation({data, slope, xScale,yScale} : {data : Array<DataPoint>, slope : any, xScale : any, yScale : any}) {

    const mae = calculateMAE(data, slope);

    let coords = data.map(({price, area}) => ({x: area, y: price}));

    return (
            <ScatterPlot data={coords} width={800} height={800}>
                <line
                    x1={xScale(0)}
                    y1={yScale(0)}
                    x2={xScale(xScale.domain()[1])}
                    y2={yScale(xScale.domain()[1] * slope)}
                    stroke="red"
                    strokeWidth={1}
                />
                {coords.map(({x, y}) => (
                    <g key={`${x}-${y}`}>
                        <line
                            x1={xScale(x)}
                            y1={yScale(y)}
                            x2={xScale(x)}
                            y2={yScale(x * slope)}
                            stroke="gray"
                            strokeWidth={3}
                            opacity={calculateOpacity(xScale(x), yScale(y), xScale(x), yScale(x * slope))}
                        />
                        <circle
                            cx={xScale(x)}
                            cy={yScale(y)}
                            r={3}
                            fill="black"
                        />
                    </g>
                ))}
                <text x={40} y={80} fill="black" fontSize={14}>
                    MAE: {mae.toFixed(2)}
                </text>
            </ScatterPlot>
    );
}
