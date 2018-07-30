const feedback = require('../models/feedbacks')
const widget = require('../models/widgetSettings')
module.exports.getfeedbacks = async ({widgetID}) => {
  return await feedback.find({widgetID : widgetID})
}

module.exports.setfeedback = async (options) => {
  const newFeedback = new feedback(options)
      return await newFeedback.save((err, feedback)=> {
        if (err) throw err
      })
}
