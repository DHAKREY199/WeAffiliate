const feedbackRepo = require('../../repositories/feedback')
module.exports = {
  getfeedbacks: async(options) => {
    const feedbacks = await feedbackRepo.getfeedbacks(options);
    return feedbacks
  },
  setfeedback: async(options) => {
    await feedbackRepo.setfeedback(options);
  }
}
