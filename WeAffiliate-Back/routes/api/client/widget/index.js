const express = require('express')
const router = express.Router()

router.use('/style', require('./style'))
router.use('/button', require('./button'))
router.use('/category', require('./category'))
router.use('/fieldSetting', require('./fieldSetting'))
router.use('/thankyouMessage', require('./thankyouMessage'))

module.exports = router;
