const categoryService = require('../../services/client/widget/category')
const fieldService = require('../../services/client/widget/fieldSetting')
const ButtonService = require('../../services/client/widget/button')
const ThankyouMessageService = require('../../services/client/widget/thankyouMessage')
module.exports = {
  getClientFormSetting: async(req, res) => {
    try {
      const requestedWidgetID = req.query.widgetID
      const options = {
        widgetID : requestedWidgetID
      }

      const FieldSetting = await fieldService.getFields(options)
      const Categories = await categoryService.getCategories(options)
      const ThankyouMessage = await ThankyouMessageService.getThankyouMessage(options)

      const form = {
        categories : [],
        defaultFields : FieldSetting[0].defaultFields,
        otherFields : FieldSetting[0].fieldSetting,
        thankyouMessage: ThankyouMessage
      }
      Categories[0].categorySetting.forEach((category)=> {
        let cate = {
          name : category.name,
          display: category.display,
          isDefault: category.isDefault
        }
        form.categories.push(cate)
      })
      //console.log(form)
      res.json({
        "status":0,
        "result":form
      })


    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.toString()
      })
    }
  },
  getClientButtonSetting: async(req, res) => {
    try {
      const requestedWidgetID = req.query.widgetID
      const options = {
        widgetID : requestedWidgetID
      }

      const ButtonSetting = await ButtonService.getButtonSetting(options)
      res.json({
        "status": 0,
        result : ButtonSetting
      })


    } catch(exception) {
      res.json({
        'status': -1,
        'message': exception.toString()
      })
    }
  }
}
