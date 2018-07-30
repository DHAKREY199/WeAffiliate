const passport = require('passport')
const Client = require("../../models/clients")
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")

const login = (req, res) => {
  try {
    const failureResponse = { 'status': -1, 'message': 'Invalid Username or Password', 'result': null }

    passport.authenticate('local', (err, user, info) => {
      if(err) return res.json({'status': -1, 'message': err.toString() });
      if (err || !user) return res.json(failureResponse)
      failureResponse.message = typeof info === 'object' ? info.message : info
      req.logIn(user, null, (loginInErr) => {
        if (loginInErr) {
          return res.json(failureResponse)
        }
        res.json({ 'status': 0, 'message': 'Succesful login', 'result': user })
      })
    })(req, res)
  } catch (e) {
    res.json({
      "status": -1,
      "message": e.toString()
    })
  }
}

const signup = (req, res) => {

  try {
    const failureResponse = { 'status': -1, 'message': '', 'result': null }
    // const username = req.body.username
    // const email = req.body.email
    // const phoneNo = req.body.phoneNo
    // const organizationName = req.body.organizationName
    // const subscriptionDetail = req.body.subscriptionDetail
    const {username, email, phoneNo, organizationName, subscriptionDetail, firstname, lastname, city, country} = req.body;
    if(!username){
        res.json({
          "status": -1,
          "message": `username cannot be ${req.body.username} `
        })
    } else if(!email){
        res.json({
          "status": -1,
          "message": `email cannot be ${req.body.email} `
        })
    } else if(!subscriptionDetail){
        res.json({
          "status": -1,
          "message": `please provide valid subscription detail`
        })
    } else {
        const options = {
          username,
          email,
          phoneNo,
          organizationName,
          subscriptionDetail,
          firstname,
          lastname,
          city,
          country
        }

        Client.register(new Client(options), req.body.password, (err, client) => {
          if(err){
            console.log(err);
            res.json({"status": -1, "message": err.toString()})
          }
          console.log(client);
          passport.authenticate("local")(req, res, function(){
            res.json({"status": 0, "message": "new client added sucessfully in database"});
          });
        })
    }
  } catch (e) {
    res.json({
      "status": -1,
      "message": e.toString()
    })
  }

}

const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err)
      } else {
        req.logout()
        res.json({ 'status': 0, 'message': 'Succesfully logged out', 'result': null })
      }
    })
  } catch (e) {
    res.json({
      "status": -1,
      "message": e.toString()
    })
  }

}


module.exports = {
  login,
  logout,
  signup
}
