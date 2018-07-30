const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/auth')

router.use('/client' , authMiddleware.isLoggedIn, require('./client'))
router.use('/feedback',require('./feedback'))
router.use('/auth', require('./auth'))
router.use('/form', require('./form'))

module.exports = router;


// router.use('/register',(req, res) => {
//   const options = {
//     username : req.body.name,
//     clientID: req.body.clientID,
//     email: req.body.email,
//     phoneNo: req.body.phoneNo,
//     organizationName: req.body.organizationName,
//     subscriptionDetail: {
//     expiryDate: req.body.subscriptionDetail.expiryDate,
//     active: req.body.subscriptionDetail.active
//   }
// }
//   Client.register(new Client(options), req.body.password, (err, client) => {
//     if(err){
//       console.log(err);
//     }
//     console.log(client);
//     res.send("thankyou");
//     // passport.authenticate("local")(req, res, ()=> {
//     //   Client.create(client);
//     // })
//   })
// })
//
// // router.use('/login', passport.authenticate('local'), (req, res)=>{
// //   res.send("It's been a great to meet u.");
// // })
