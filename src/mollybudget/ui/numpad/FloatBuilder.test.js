import FloatBuilder from 'ui/numpad/FloatBuilder';


describe('toFloat', () => {
    it('returns 0.0 initially', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.toFloat()).toBeCloseTo(0.0);
    });

    it('ignores a trailing decimal point', () => {
        const floatBuilder = new FloatBuilder('1.');
        expect(floatBuilder.toFloat()).toBeCloseTo(1.0);
    });
});

describe('point', () => {
    it('returns a new FloatBuilder with a decimal point appended to the float value', () => {
        const floatBuilder = new FloatBuilder('1');
        expect(floatBuilder.point().two().toFloat()).toBeCloseTo(1.2);
    });

    it('returns an identical FloatBuilder if a decimal point already exists', () => {
        const floatBuilder = new FloatBuilder('1.1');
        expect(floatBuilder.point().two().toFloat()).toBeCloseTo(1.12);
    });

    it('allows the user to build a number with no whole component', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.point().zero().one().three().toFloat()).toBeCloseTo(0.013);
    });
});

describe('clear', () => {
    it('returns a new FloatBuilder with "0" as the float value', () => {
        const floatBuilder = new FloatBuilder('1.2');
        expect(floatBuilder.clear().toFloat()).toBeCloseTo(0.0);
    });
});

describe('zero', () => {
    it('returns an identical FloatBuilder when the current float value is zero', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.zero().toFloat()).toBeCloseTo(0.0);
    });

    it('returns a new FloatBuilder with "0" appended to the float value', () => {
        const floatBuilder = new FloatBuilder('1');
        expect(floatBuilder.zero().toFloat()).toBeCloseTo(10.0);
    });
   
    it('returns a new FloatBuilder with "0" appended to the float value after the decimal point', () => {
        const floatBuilder = new FloatBuilder('1.');
        expect(floatBuilder.zero().toFloat()).toBeCloseTo(1.0);
    });
});

describe('one', () => {
    it('returns a new FloatBuilder with "1" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.one().toFloat()).toBeCloseTo(1.0);
    });

    it('returns an identical FloatBuilder when the value exceeds 9999999999', () => {
        const floatBuilder = new FloatBuilder('1000000000');
        expect(floatBuilder.zero().toFloat()).toBeCloseTo(1000000000);
    });
});

describe('two', () => {
    it('returns a new FloatBuilder with "2" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.two().toFloat()).toBeCloseTo(2.0);
    });
});

describe('three', () => {
    it('returns a new FloatBuilder with "3" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.three().toFloat()).toBeCloseTo(3.0);
    });
});

describe('four', () => {
    it('returns a new FloatBuilder with "4" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.four().toFloat()).toBeCloseTo(4.0);
    });
});

describe('five', () => {
    it('returns a new FloatBuilder with "5" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.five().toFloat()).toBeCloseTo(5.0);
    });
});

describe('six', () => {
    it('returns a new FloatBuilder with "6" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.six().toFloat()).toBeCloseTo(6.0);
    });
});

describe('seven', () => {
    it('returns a new FloatBuilder with "7" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.seven().toFloat()).toBeCloseTo(7.0);
    });
});

describe('eight', () => {
    it('returns a new FloatBuilder with "8" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.eight().toFloat()).toBeCloseTo(8.0);
    });
});

describe('nine', () => {
    it('returns a new FloatBuilder with "9" appended to the float value', () => {
        const floatBuilder = new FloatBuilder();
        expect(floatBuilder.nine().toFloat()).toBeCloseTo(9.0);
    });
});
