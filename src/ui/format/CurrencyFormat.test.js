import formatCurrency from 'ui/format/CurrencyFormat';


describe('formatCurrency', () => {
    it('returns a formatted version of the number with two decimal places', () => {
        expect(formatCurrency(11)).toBe('11.00');
    });

    it('truncates numbers with more than two decimal places', () => {
        expect(formatCurrency(100.123)).toBe('100.12');
    });

    it('handles negative numbers', () => {
        expect(formatCurrency(-5.08)).toBe('-5.08');
    });
});
