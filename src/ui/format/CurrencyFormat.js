export function formatCurrency(number) {
    return number.toFixed(2);
}

export function parseCurrency(string) {
    if(/^-?\d+(\.\d*)?$/.test(string)) {
        return Number.parseFloat(string);
    } else {
        return null;
    }
}
