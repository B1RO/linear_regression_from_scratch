import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getCSVData} from "./GetCSVData";
import {StyledTable} from "./StyledTable";

const TableContainer = styled.div`
  max-height: 400px; /* Adjust the max height as needed */
  overflow-y: auto;
  overflow-x: hidden;
`;


const CsvTable = () => {
    const [csvData, setCsvData] = useState([]);
    useEffect(() => {
        getCSVData().then(setCsvData)
    }, []);

    return (
        <TableContainer>
            {csvData.length > 0 ? (
                <StyledTable>
                    <thead>
                    <tr>
                        {Object.keys(csvData[0]).map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {csvData.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, index) => (
                                <td key={index}>{value as any}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </StyledTable>
            ) : (
                <p>Loading CSV data...</p>
            )}
        </TableContainer>
    );
};

export default CsvTable;
