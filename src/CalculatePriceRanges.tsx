import {DataPoint} from "./DataPoint";

export function calculatePriceRanges(dataPoints: DataPoint[], numIntervals: number): Map<string, [number, number, number]> {
    // Find the minimum and maximum area values
    const minArea = Math.min(...dataPoints.map((dataPoint) => dataPoint.area));
    const maxArea = Math.max(...dataPoints.map((dataPoint) => dataPoint.area));

    // Calculate the interval size
    const intervalSize = (maxArea - minArea) / numIntervals;

    // Create a map to store the price ranges for each interval
    const priceRanges = new Map<string, [number, number, number]>();

    // Iterate over the intervals
    for (let i = 0; i < numIntervals; i++) {
        const intervalStart = minArea + i * intervalSize;
        const intervalEnd = minArea + (i + 1) * intervalSize;

        // Find the data points within the current interval
        const dataPointsInRange = dataPoints.filter(
            (dataPoint) => dataPoint.area >= intervalStart && dataPoint.area < intervalEnd
        );

        // Calculate the range of prices for the current interval
        const prices = dataPointsInRange.map((dataPoint) => dataPoint.price);
        const priceRange: [number, number] = [Math.min(...prices), Math.max(...prices)];

        // Calculate the average price for the current interval
        const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        // Store the price range and the average price for the current interval in the map
        priceRanges.set(`${intervalStart}-${intervalEnd}`, [...priceRange, avgPrice]);
    }

    return priceRanges;
}
