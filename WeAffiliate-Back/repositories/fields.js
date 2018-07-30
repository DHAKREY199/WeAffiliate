const widgetSettings = require('../models/widgetSettings')

module.exports.updateFields = async ({widgetID, fieldSetting, defaultFields}) => {
      console.log(fieldSetting)
      console.log("**********")
      console.log(defaultFields)
       await widgetSettings.update({widgetID : widgetID},
                                         { $set : {defaultFields: defaultFields}},
                                           (error, fields) => {
                                              if(error)
                                                throw error
                                          } )
      await widgetSettings.update({widgetID : widgetID},
      { $set : {fieldSetting: fieldSetting}},
        (error, fields) => {
            if(error)
              throw error
        } )
        return ;
}

module.exports.getFields = async ({widgetID}) => {
  return await widgetSettings.find({widgetID: widgetID},'fieldSetting defaultFields', (error, style) => {
    if(error)
      throw error
  })
}
