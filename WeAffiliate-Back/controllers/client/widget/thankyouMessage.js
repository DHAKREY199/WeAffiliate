const ThankyouMessageService = require('../../../services/client/widget/thankyouMessage')

module.exports = {
  updateThankyouMessage : async(req, res) => {
    try {
      const options = req.body ;
      //options.clientID = req.user.clientID;
      await ThankyouMessageService.updateThankyouMessage(options);
      res.json({
        'status': 0,
        'message': 'sucessfully updated thankyou message setting'
      })
    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.message
      })
    }
  } ,
  getThankyouMessage: async(req, res) => {
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
        const ThankyouMessage = await ThankyouMessageService.getThankyouMessage(options)
        res.json({
          "status": 0,
          "result":ThankyouMessage
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
