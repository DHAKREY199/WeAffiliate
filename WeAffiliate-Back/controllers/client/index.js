const clientService = require('../../services/client')
const widgetDefaults = require("../../constants/widgetDefaults")
module.exports = {
  getClientSchema: async(req, res) => {
    try {
      const requestedWidgetID = req.query.widgetID;
      const clientWidgets = req.user.widgets;
      const clientID = req.user.clientID;
      let widgetExists = false;
      clientWidgets.forEach((widget) => {
        if(widget == requestedWidgetID){
          widgetExists = true;
        }
      })

      if(!widgetExists){
        res.json({
          'status' : -1,
          'message': `widget of widgetID ${requestedWidgetID} does not exist for client with clientID ${clientID}`
        })
      } else {
            const options = {
              widgetID : requestedWidgetID
            }

            const clientSchema = await clientService.getClientSchema(options);
            if(clientSchema.length < 1){
              res.json({
                'status' : -1,
                'message': 'No client exists with following clientId'
              })
            } else {
              res.json({
                'status' : 0,
                'result' : clientSchema
              })
            }
      }
  } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.toString()
      })
    }
  },

  setClientSchema: async(req, res) => {
    try {
      const clientID = req.user.clientID
      const buttonSetting = req.body.buttonSetting || widgetDefaults.buttonSetting
      const categorySetting = req.body.categorySetting || widgetDefaults.categorySetting
      const defaultFields = req.body.defaultFields || widgetDefaults.defaultFields
      const fieldSetting = req.body.fieldSetting
      const thankyouMessage = req.body.thankyouMessage || widgetDefaults.thankyouMessage
      const styleSetting = req.body.styleSetting || widgetDefaults.styleSetting
      const options = {
        clientID,
        buttonSetting,
        categorySetting,
        defaultFields,
        fieldSetting,
        thankyouMessage,
        styleSetting
      }
      await clientService.setClientSchema(options);
      res.json({
        'status': 0,
        'message': 'sucessfully added clientSchema',
        'information': options
      })
    } catch(exception) {
      console.log(exception)
      res.json({
        'status': -1,
        'message': exception.toString()
      })
    }
  }
}
