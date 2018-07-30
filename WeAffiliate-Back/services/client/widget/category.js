const categoryRepo = require('../../../repositories/category')
module.exports = {
  updateCategories: async(options) => {
    const categories = await categoryRepo.updateCategories(options);
    return categories
  },
  getCategories: async({widgetID}) => {
    const button = await categoryRepo.getCategories({
      widgetID : widgetID
    });
    return button
  }
}
