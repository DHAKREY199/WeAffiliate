const express = require('express')
const router = express.Router()

const clientSchema = require('../../../controllers/client')

router.use('/changeWidgetSetting', require('./widget'))
router.use('/dashboard', require('./dashboard'))
router.get('/getClientSchema', clientSchema.getClientSchema)
router.post('/setClientSchema', clientSchema.setClientSchema)



module.exports = router;
