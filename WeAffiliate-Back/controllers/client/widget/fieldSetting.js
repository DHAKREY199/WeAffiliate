const fieldService = require('../../../services/client/widget/fieldSetting')

module.exports = {
  updateFieldSetting : async(req, res) => {
    try {
      console.log(req.body)
      const options = req.body ;
      //options.clientID = req.user.clientID;
      await fieldService.updateFields(options);
      res.json({
        'status': 0,
        'message': 'sucessfully updated field setting'
      })
    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.message
      })
    }
  },
  getFieldSetting: async(req, res) => {
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
        const FieldSetting = await fieldService.getFields(options)
    
        res.json({
          "status": 0,
          "result":FieldSetting
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
