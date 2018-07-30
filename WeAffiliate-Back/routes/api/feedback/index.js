const express = require('express')
const router = express.Router()
const authMiddleware = require('../../../middleware/auth')

const feedback = require('../../../controllers/feedback')

router.get('/getClientfeedbacks',authMiddleware.isLoggedIn, feedback.getfeedbacks)
router.post('/setClientfeedback', feedback.setfeedback)

module.exports = router;
