const styleService = require('../../../services/client/widget/style')

module.exports = {
  updateStyle : async(req, res) => {
    try {
      const options = req.body ;
      options.clientID = req.user.clientID;
      await styleService.updateStyle(options);
      res.json({
        'status': 0,
        'message': 'sucessfully updated style setting'
      })
    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.message
      })
    }
  },
  getStyle: async(req, res) => {
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
        const StyleSetting = await styleService.getStyle(options)
        res.json({
          "status": 0,
          "result":StyleSetting
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
