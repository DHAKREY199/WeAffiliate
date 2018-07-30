const fieldsRepo = require('../../../repositories/fields')
module.exports = {
  updateFields: async(options) => {
    const fields = await fieldsRepo.updateFields(options);
    return fields
  },
  getFields: async({widgetID}) => {
    const fields = await fieldsRepo.getFields({
      widgetID : widgetID
    });
    return fields
  }
}
