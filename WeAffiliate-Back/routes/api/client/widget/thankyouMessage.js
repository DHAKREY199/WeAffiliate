const express = require('express')
const router = express.Router()
const ThankYouMessageCtrl = require('../../../../controllers/client/widget/thankyouMessage')
router.post('/updateThankyouMessage', ThankYouMessageCtrl.updateThankyouMessage)
router.get('/getThankyouMessage', ThankYouMessageCtrl.getThankyouMessage)

module.exports = router;
