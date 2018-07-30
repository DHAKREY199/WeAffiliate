const express = require('express')
const router = express.Router()
const CategoryCtrl = require('../../../../controllers/client/widget/category')
router.post('/updateCategories', CategoryCtrl.updateCategories)
router.get('/getCategories', CategoryCtrl.getCategories)

module.exports = router;
