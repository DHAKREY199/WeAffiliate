const buttonRepo = require('../../../repositories/button')
module.exports = {
  updateButtonSetting: async(options) => {
    const button = await buttonRepo.updateButton(options);
    return button
  },
  getButtonSetting: async({widgetID}) => {
    const button = await buttonRepo.getButton({
      widgetID : widgetID
    });
    return button
  }
}
