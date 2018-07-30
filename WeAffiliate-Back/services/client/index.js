const clientRepo = require('../../repositories/clientSchema')
module.exports = {
  getClientSchema: async({clientID}) => {
    const clientSchema = await clientRepo.getSchema({
      clientID : clientID
    });
    //console.log(clilentSchema);
    return clientSchema
  },
  setClientSchema: async(options) => {
    await clientRepo.setSchema(options);
  }
}
