const clientProfileRepo = require('../../../repositories/profile')

module.exports = {

  getClientProfile: async({clientID}) => {
    const profile = await clientProfileRepo.getClientProfile({
      clientID : clientID
    });
    return profile
  },
  updateClientProfile: async(options) => {
    const updatedProfile = await clientProfileRepo.updateClientProfile(options);
    return updatedProfile
  }
}
