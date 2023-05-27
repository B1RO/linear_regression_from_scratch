import React from 'react';
import {AxisBottom, AxisLeft} from '@visx/axis';
import {scaleLinear} from '@visx/scale';
import {Circle} from '@visx/shape';
import {Group} from "@visx/group";

interface DataPoint {
    x: number;
    y: number;
}

export function createScaleFunctions(props: ScatterPlotProps) {
    const {data, width, height} = props;

    const xValues = data.map((d) => d.x);
    const yValues = data.map((d) => d.y);

    const xDomain = [0, Math.max(...xValues)];
    const yDomain = [0, Math.max(...yValues)];

    const xScale = scaleLinear({
        domain: xDomain,
        range: [0, props.width],
    });

    const yScale = scaleLinear({
        domain: yDomain,
        reverse: true,
        range: [0, props.height],
    });

    return {xScale, yScale};
}

interface ScatterPlotProps {
    data: DataPoint[];
    width: number;
    height: number;
    children?: React.ReactNode;
}

const ScatterPlot: React.FC<ScatterPlotProps> = (props) => {
    const {xScale, yScale} = createScaleFunctions(props)

    return (
        <svg width={props.width} height={props.height}>
            <Group left={80} top={-40}>
                <AxisBottom
                    scale={xScale}
                    top={props.height}
                    label="Area"
                    numTicks={props.width / 80}
                />
                <AxisLeft
                    left={0}
                    scale={yScale}
                    label="Price"
                    numTicks={props.height / 50}
                />
                {props.data.map((d, i) => (
                    <Circle
                        key={i}
                        cx={xScale(d.x)}
                        cy={yScale(d.y)}
                        r={4}
                        fill="black"
                    />
                ))}

                {/* Render additional children */}
                {props.children}
            </Group>
        </svg>
    );
};

export default ScatterPlot;
