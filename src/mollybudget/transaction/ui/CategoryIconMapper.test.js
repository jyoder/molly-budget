import CategoryIconMapper from 'mollybudget/transaction/ui/CategoryIconMapper';


describe('toIcon', () => {
    it('returns the dollar icon for the General category', () => {
        expect(CategoryIconMapper.toIcon('General')).toBe('dollar');
    });

    it('returns the coffee icon for the Outing category', () => {
        expect(CategoryIconMapper.toIcon('Outing')).toBe('coffee');
    });

    it('returns the car icon for the Car category', () => {
        expect(CategoryIconMapper.toIcon('Car')).toBe('car');
    });

    it('returns the shopping-cart icon for the Groceries category', () => {
        expect(CategoryIconMapper.toIcon('Groceries')).toBe('shopping-cart');
    });

    it('returns the shopping-cart icon for the Income category', () => {
        expect(CategoryIconMapper.toIcon('Income')).toBe('money');
    });

    it('returns the question icon for an unknown category', () => {
        expect(CategoryIconMapper.toIcon('Barf')).toBe('question');
    });
});
