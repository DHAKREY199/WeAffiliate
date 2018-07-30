const express = require('express')
const router = express.Router()
const StyleCtrl = require('../../../../controllers/client/widget/style')
router.post('/updateStyle', StyleCtrl.updateStyle)
router.get('/getStyle', StyleCtrl.getStyle)

module.exports = router;
