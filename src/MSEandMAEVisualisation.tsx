import React, {useEffect, useState} from "react";
import {DataPoint} from "./DataPoint";
import {createScaleFunctions} from "./ScatterPlot";
import {getCSVData} from "./GetCSVData";
import styled from "styled-components";
import {MSEVisualisation} from "./MSEVisualisation";
import {MAEVisualisation} from "./MAEVisualisation";



const StyledButton = styled.button`
  padding: 1rem;
  background-color: #212121;
  color: white;
  position: absolute;
`;


export function MSEAndMAEVisualisation()
{
    const [data, setData] = useState<DataPoint[]>([]);
    const {xScale, yScale} = createScaleFunctions({
        height: 800,
        width: 800,
        data: data.map(({price, area}) => ({x: area, y: price})),
    });
    const [slope, setSlope] = useState((0));
    useEffect(()=>{
        handleNewLine()
    }, [data.length])

    useEffect(() => {
        getCSVData().then(setData);
    }, []);

    const handleNewLine = () => {
        setSlope((Math.random() * 2 * yScale.domain()[1]) / xScale.domain()[1]) // random slope between -1 and 1
    }

    return <div>
        <MAEVisualisation data={data} yScale={yScale} slope={slope} xScale={xScale}/>
        <MSEVisualisation data={data} yScale={yScale} slope={slope} xScale={xScale}/>
        <StyledButton onClick={handleNewLine}>Try a different line</StyledButton>
    </div>
}
