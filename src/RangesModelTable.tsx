import {useEffect, useState} from "react";
import {getCSVData} from "./GetCSVData";
import {DataPoint} from "./DataPoint";
import {StyledTable} from "./StyledTable";
import {calculatePriceRanges} from "./CalculatePriceRanges";

export function RangesModelTable() {
    const [csvData, setCsvData] = useState<Array<DataPoint>>([]);
    useEffect(() => {
        getCSVData().then(setCsvData)
    }, []);


    return (
        <StyledTable>
            <thead>
            <tr>
                <th>Interval</th>
                <th>Price Range</th>
            </tr>
            </thead>
            <tbody>
            {Array.from(calculatePriceRanges(csvData, 7).entries()).map(([interval, priceRange]) => (
                <tr key={interval}>
                    <td>{interval}</td>
                    <td>{`${priceRange[0]} - ${priceRange[1]}`}</td>
                </tr>
            ))}
            </tbody>
        </StyledTable>
    );
}
