const thankyouMessageRepo = require('../../../repositories/thankyouMessage')
module.exports = {
  updateThankyouMessage: async(options) => {
    const message = await thankyouMessageRepo.updateThankyouMessage(options);
    return message
  },
  getThankyouMessage: async({widgetID}) => {
    const message = await thankyouMessageRepo.getThankyouMessage({
      widgetID : widgetID
    });
    return message
  }
}
