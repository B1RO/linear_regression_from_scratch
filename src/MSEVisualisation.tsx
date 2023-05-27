import React, {useEffect, useState} from "react";
import {getCSVData} from "./GetCSVData";
import {DataPoint} from "./DataPoint";
import ScatterPlot, {createScaleFunctions} from "./ScatterPlot";
import {Line} from '@visx/shape';
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 1rem;
  background-color: #212121;
  color: white;
  position: absolute;
`;

function calculateMSE(data: any, slope: any) {
    // @ts-ignore
    const sum = data.reduce((total, {price, area}) => {
        const error = price - slope * area;
        return total + error * error;
    }, 0);
    return sum / data.length;
}

function calculateOpacity(x1 : number, y1 : number, x2 : number, y2 : number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lineLength = dx * dx + dy * dy;
    return (lineLength / (500000)); // Adjust the scaling factor as needed
}


export function MSEVisualisation({data, slope, xScale,yScale} : {data : Array<DataPoint>, slope : any, xScale : any, yScale : any}) {
    const mse = calculateMSE(data, slope);

    let coords = data.map(({price, area}) => ({x: area, y: price}));


    return (
        <div>
            <ScatterPlot data={coords} width={800} height={800}>
                <Line
                    from={{x: xScale(0), y: yScale(0)}}
                    to={{x: xScale(xScale.domain()[1]), y: yScale(xScale.domain()[1] * slope)}}
                    stroke="red"
                    strokeWidth={1}
                />
                {coords.map(({x, y}) => (
                    <g key={`${x}-${y}`}>
                        <Line
                            from={{x: xScale(x), y: yScale(y)}}
                            to={{x: xScale(x), y: yScale(x * slope)}}
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
                    Sqrt(MSE): {Math.sqrt(mse).toFixed(2)}
                </text>
            </ScatterPlot>
        </div>
    );
}
