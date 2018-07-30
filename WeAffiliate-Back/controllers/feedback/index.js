const feedbackService = require('../../services/feedback');

module.exports = {
  getfeedbacks: async(req, res) => {
    try {
      const clientID = req.user.clientID
      const requestedWidgetID = req.query.widgetID
      const clientWidgets = req.user.widgets
      let widgetExists = false
      clientWidgets.forEach((widget) => {
        if(widget == requestedWidgetID){
          widgetExists = true;
        }
      })
      const options = {
        widgetID : requestedWidgetID
      }
      if(!widgetExists){
        res.json({
          'status' : -1,
          'message': `widget of widgetID ${requestedWidgetID} does not exist for client with clientID ${clientID}`
        })
      }  else {
        const feedbacks = await feedbackService.getfeedbacks(options);
        if(feedbacks.length < 1){
          res.json({
            'status' : -1,
            'message': `No feedback exists for widgetID ${requestedWidgetID}`
          })
        } else {
          res.json({
            'status' : 0,
            'result' : feedbacks
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

  setfeedback: async(req, res) => {
    try {
      const widgetID = req.body.widgetID
      const clientID = req.user.clientID
      const clientWidgets = req.user.widgets
      const requestedWidgetID = req.body.widgetID


      let widgetExists = false
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
          widgetID : widgetID,
          feedback : req.body.feedback
        }
          await feedbackService.setfeedback(options);
        res.json({
          'status': 0,
          'message': 'sucessfully added feedback'
        })
      }


    } catch(exception) {
      console.log(exception)
      res.json({
        'status': -1,
        'message': exception.toString()
      })
    }
  }
}
