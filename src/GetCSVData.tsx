import Papa from "papaparse";

export async function getCSVData(): Promise<any> {
    const csvFilePath = './housing.csv';
    return new Promise((resolve) => {
        Papa.parse(csvFilePath, {
            download: true,
            header: true,
            complete: function (results) {
                resolve((results.data as any).map(({price, area}: { price: string, area: string }) => ({
                    price: Number.parseFloat(price),
                    area: Number.parseFloat(area)
                })).filter(({price, area}: {
                    price: number,
                    area: number
                }) => !Number.isNaN(price) && !Number.isNaN(area)))
            }
        });
    });
}
