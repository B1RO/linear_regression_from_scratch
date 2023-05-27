import React, {useEffect, useState} from "react";
import {getCSVData} from "./GetCSVData";
import {DataPoint} from "./DataPoint";
import ScatterPlot from "./ScatterPlot";

type HighlightedRange = {

}

export const ScatterPlotExample: React.FC = () => {
    const [data, setData] = useState<DataPoint[]>([]);
    useEffect(() => {
        getCSVData().then(setData)
    }, []);

    return <ScatterPlot data={data.map(({price,area})=>({x : area, y : price}))} width={800} height={800}/>
}

export default ScatterPlotExample;
