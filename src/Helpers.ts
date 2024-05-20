export function random(min: number, max: number): number {
    // Ensure min is less than max
    if (min > max) {
        [min, max] = [max, min]
    }

    return Math.random() * (max - min) + min
}

export function constrain (n: number, low: number, high: number) {
    return Math.max(Math.min(n, high), low);
}

export function map(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds?: boolean) {
    const newVal = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newVal;
    }
    if (start2 < stop2) {
        return constrain(newVal, start2, stop2);
    } else {
        return constrain(newVal, stop2, start2);
    }
}