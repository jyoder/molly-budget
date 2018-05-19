export default class CategoryIconMapper {
    static toIcon(category) {
        switch(category) {
            case 'General' : return 'dollar';
            case 'Outing' : return 'coffee';
            case 'Car' : return 'car';
            case 'Groceries' : return 'shopping-cart';
            case 'Income' : return 'money';
            case 'Rollover' : return 'angle-double-right';
            default: return 'question';
        }
    }
}
