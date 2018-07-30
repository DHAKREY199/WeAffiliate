const ButtonService = require('../../../services/client/widget/button')
const widgetDefaults = require("../../../constants/widgetDefaults")
module.exports = {
  updateButtonSetting : async(req, res) => {
    try {
      const options = req.body ;
      //options.widgetID = req.query.widgetID;
      await ButtonService.updateButtonSetting(options)
      res.json({
        'status': 0,
        'message': 'sucessfully updated button setting'
      })
    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.message
      })
    }
  } ,
  getButtonSetting: async(req, res) => {
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
          widgetID: requestedWidgetID
        }
        const ButtonSetting = await ButtonService.getButtonSetting(options)
        res.json({
          "status": 0,
          "result":ButtonSetting
        })
      }
    } catch (exception) {
        res.json({
          'status': -1,
          'message': exception.toString()
        })
    }
  }
}
