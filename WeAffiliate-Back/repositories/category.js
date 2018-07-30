const widgetSettings = require('../models/widgetSettings')

module.exports.updateCategories = async ({widgetID, categorySetting}) => {
   await widgetSettings.update({widgetID : widgetID}, { $set : {categorySetting: categorySetting}}, (error, categories) => {
    if(error)
      throw error
  } )
  return ;
}

module.exports.getCategories = async ({widgetID}) => {
  return await widgetSettings.find({widgetID: widgetID},'categorySetting', (error, button) => {
    if(error)
      throw error
  })
}
