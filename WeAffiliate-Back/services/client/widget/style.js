const styleRepo = require('../../../repositories/style')
module.exports = {
  updateStyle: async(options) => {
    const style = await styleRepo.updateStyle(options);
    return style
  },
  getStyle: async({widgetID}) => {
    const style = await styleRepo.getStyle({
      widgetID : widgetID
    });
    return style
  }
}
