const clients = require('../models/clients')

module.exports.getClientProfile = async({clientID}) => {
  return await clients.find({clientID: clientID},(error, button) => {
    if(error)
      throw error
  })
}

module.exports.updateClientProfile = async ({widgetID, clientProfile}) => {
      return await clients.update({widgetID : widgetID}, clientProfile, (error, message) => {
        if(error)
          throw error
      } )
}
