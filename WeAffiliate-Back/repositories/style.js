const widgetSettings = require('../models/widgetSettings')

module.exports.updateStyle = async ({widgetID, styleSetting}) => {
  return await widgetSettings.update({widgetID : widgetID},
                                      { $set : {styleSetting: styleSetting}},
                                      (error, style) => {
                                          if(error)
                                            throw error
                                      })
}

module.exports.getStyle = async ({widgetID}) => {
  return await widgetSettings.find({widgetID: widgetID},'styleSetting', (error, style) => {
    if(error)
      throw error
  })
}
