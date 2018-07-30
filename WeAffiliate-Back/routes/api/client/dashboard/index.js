const express = require('express')
const router = express.Router()

const dashboardCtrl = require('../../../../controllers/client/dashboard')

//router.post('/totalUsersOfClient', dashboardCtrl.getTotalUsers)
router.get('/getClientProfile', dashboardCtrl.getClientProfile)
router.post('/updateClientProfile', dashboardCtrl.updateClientProfile)


module.exports = router
