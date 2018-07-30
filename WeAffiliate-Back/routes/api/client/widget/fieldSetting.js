const express = require('express')
const router = express.Router()
const FieldSettingCtrl = require('../../../../controllers/client/widget/fieldSetting')
router.post('/updateFieldSetting', FieldSettingCtrl.updateFieldSetting)
router.get('/getFieldSetting', FieldSettingCtrl.getFieldSetting)
module.exports = router;
