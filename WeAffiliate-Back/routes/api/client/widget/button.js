const express = require('express')
const router = express.Router()
const ButtonCtrl = require('../../../../controllers/client/widget/button')
router.post('/updateButtonSetting', ButtonCtrl.updateButtonSetting)
router.get('/getButtonSetting', ButtonCtrl.getButtonSetting)

module.exports = router;
