const widgetSettings = require('../models/widgetSettings')
const clients = require('../models/clients')

module.exports.getSchema = async ({clientID, widgetID}) => {
  return await widgetSettings.find({clientID : clientID, widgetID : widgetID})
}

module.exports.setSchema = async (options) => {
  try {
      widget = new widgetSettings(options)
      return await widget.save((error, widget) => {
        if(error)
          throw error
        clients.update({clientID : options.clientID}, {"$push": {"widgets": widget.widgetID}}, (error, client) => {
          if(error)
            throw error;
          console.log("Details of modified client", client);
        })
      })
  } catch(exception) {
    return await exception
  }
}
