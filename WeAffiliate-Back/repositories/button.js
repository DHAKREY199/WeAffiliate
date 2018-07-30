const widgetSettings = require('../models/widgetSettings')

module.exports.updateButton = async ({widgetID, buttonSetting}) => {

    return await widgetSettings.update({widgetID : widgetID}, { $set : {buttonSetting: buttonSetting}}, (error, button) => {
      if(error)
        throw error
    } )
}

module.exports.getButton = async({widgetID}) => {
  return await widgetSettings.find({widgetID: widgetID},'buttonSetting', (error, button) => {
    if(error)
      throw error
  })
}
