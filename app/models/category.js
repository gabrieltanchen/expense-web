import Model, { attr, hasMany } from '@ember-data/model';

export default class CategoryModel extends Model {
  @attr('date') createdAt;
  @attr('number') expenseCount;
  @attr('string') name;
  @attr('number') subcategoryCount;
  @attr('dollars') sumAmount;
  @attr('dollars') sumReimbursed;

  @hasMany(
    'subcategory',
    { async: true, inverse: 'category' },
  ) subcategories;

  get sumAmountStr() {
    if (parseFloat(this.sumAmount) === 0) {
      return '-';
    }
    const sumAmountStr = parseFloat(this.sumAmount).toLocaleString('en-CA', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    return `$${sumAmountStr}`;
  }

  get sumReimbursedStr() {
    if (parseFloat(this.sumReimbursed) === 0) {
      return '-';
    }
    const sumReimbursedStr = parseFloat(this.sumReimbursed).toLocaleString('en-CA', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    return `$${sumReimbursedStr}`;
  }

  get sumTotalStr() {
    const sumTotal = this.sumAmount - this.sumReimbursed;
    if (parseFloat(sumTotal) === 0) {
      return '-';
    }
    const sumTotalStr = parseFloat(sumTotal).toLocaleString('en-CA', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    return `$${sumTotalStr}`;
  }
}
