const express = require('express')
const router = express.Router()

const form = require('../../../controllers/form')

router.get('/getClientFormSetting', form.getClientFormSetting)
router.get('/getClientButtonSetting', form.getClientButtonSetting)

module.exports = router;
