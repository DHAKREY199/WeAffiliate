const widgetSettings = require('../models/widgetSettings')

module.exports.updateThankyouMessage = async ({widgetID, thankyouMessage}) => {
      return await widgetSettings.update({widgetID : widgetID}, { $set : {thankyouMessage: thankyouMessage}}, (error, message) => {
        if(error)
          throw error
      } )
}

module.exports.getThankyouMessage = async ({widgetID}) => {
  return await widgetSettings.find({widgetID: widgetID},'thankyouMessage', (error, button) => {
    if(error)
      throw error
  })
}
