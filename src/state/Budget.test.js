import Budget from 'state/Budget';
import Transaction from 'state/Transaction';


describe('create', () => {
    it('returns a budget configured with the current date', () => {
        const savedDate = Date;
        const today = new Date(2018, 2, 5);
        const transactions = [new Transaction('id1', 10.00, new Date(2018, 2, 1), 'Disneyland')];
        
        // Mock the date constructor and restore it after creating a budget
        Date = jest.fn(() => today);
        const budget = Budget.create(10.00, transactions);
        Date = savedDate;

        expect(budget.current()).toBeCloseTo(40.00);
    });
});

describe('current', () => {
    it('returns the amount accrued minus the amount spent', () => {
        const today = new Date(2018, 2, 1);
        
        const transactions = [
            new Transaction('id1', 10.00, new Date(2018, 2, 1), 'Disneyland'),
            new Transaction('id2', 15.00, new Date(2018, 2, 2), 'Knotts')
        ];

        const budget = new Budget(today, 40.00, transactions);
        expect(budget.current()).toBeCloseTo(15.00);
    });

    it('returns the accrual rate on the first day of the month', () => {
        const today = new Date(2018, 2, 1);
        const budget = new Budget(today, 40.00, []);
        expect(budget.current()).toBeCloseTo(40.00);
    });

    it('returns the accrual rate * 2 on the second day of the month', () => {
        const today = new Date(2018, 2, 2);
        const budget = new Budget(today, 40.00, []);
        expect(budget.current()).toBeCloseTo(80.00);
    });

    it('returns the accrual rate * 31 on the 31st day of the month', () => {
        const today = new Date(2018, 2, 31);
        const budget = new Budget(today, 40.00, []);
        expect(budget.current()).toBeCloseTo(31 * 40.00);
    });
});
