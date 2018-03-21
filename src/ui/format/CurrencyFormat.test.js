import { formatCurrency, parseCurrency } from 'ui/format/CurrencyFormat';


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

describe('parseCurrency', () => {
    it('returns a float parsed from the given floating point string', () => {
        expect(parseCurrency('123.11')).toBeCloseTo(123.11);
    });

    it('returns a float parsed from the given integer string', () => {
        expect(parseCurrency('123')).toBeCloseTo(123.00);
    });

    it('handles negative numbers', () => {
        expect(parseCurrency('-123.00')).toBeCloseTo(-123.00);
    });

    it('returns null if the string does not represent a number', () => {
        expect(parseCurrency('-1a23.00')).toBeNull();
    });
});
