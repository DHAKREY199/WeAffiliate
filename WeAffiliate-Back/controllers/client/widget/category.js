const categoryService = require('../../../services/client/widget/category')

module.exports = {
  updateCategories : async(req, res) => {
    try {
      const options = req.body ;
      options.clientID = req.user.clientID;
      await categoryService.updateCategories(options);
      res.json({
        'status': 0,
        'message': 'sucessfully updated categories setting'
      })
    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.message
      })
    }
  } ,
  getCategories: async(req, res) => {
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
        const Categories = await categoryService.getCategories(options)
        res.json({
          "status": 0,
          "result":Categories
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
