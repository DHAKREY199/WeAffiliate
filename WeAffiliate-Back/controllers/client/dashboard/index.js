
const clientService = require('../../../services/client/dashboard')

module.exports = {
  getTotalUsers: async(req, res) => {
    try {
      const requestedClient = req.user.clientID ? JSON.parse(req.user.clientID) : {};
      const options = {
        clientId : requestedClient
      }

      const clientSchema = await clientService.getClientFeedbacks(options);

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

    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.message
      })
    }
  },
  getClientProfile: async(req, res) =>{
    try {
      const requestedClient = req.user.clientID;
    const options = {
        clientID : requestedClient
      }

      const clientProfile = await clientService.getClientProfile(options);

      res.json({
          'status' : 0,
          'result' : clientProfile
        })


    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.message
      })
    }
  },
  updateClientProfile: async(req, res) => {
    try {
      const clientID = req.user.clientID

        const options = {
          clientID : clientID,
          clientProfile : req.body
        }
        await clientService.updateClientProfile(options);
        res.json({
          'status': 0,
          'message': 'sucessfully updated profile'
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
