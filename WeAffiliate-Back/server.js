const express                 = require("express"),
      app                     = express(),
      methodOverride          = require("method-override"),
      expressSanitizer        = require("express-sanitizer"),
      bodyParser              = require("body-parser"),
      passport                = require("passport"),
      mongoose                = require("mongoose"),
      LocalStrategy           = require("passport-local"),
      passportLocalMongoose   = require("passport-local-mongoose"),
      Client                  = require("./models/clients"),
      Widget                  = require("./models/widgetSettings"),
      Feedback                = require("./models/feedbacks"),
      expressSession          = require("express-session"),
      MongoStore              = require("connect-mongo")(expressSession),
      PORT                    = 5000;


    //const connection = mongoose.createConnection("mongodb://localhost:27017/widget");

    // configuration======================================================================
    mongoose.connect("mongodb://localhost:27017/widget");

app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));
    app.use(expressSession({
         secret:"Internship Project",
         resave: false,
         saveUninitialized: false,
         cookie : {
            path: '/', httpOnly: false, secure: false, maxAge: 60000000
         }
    }));
    app.use(expressSanitizer());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(Client.authenticate()));
    passport.serializeUser(Client.serializeUser());
    passport.deserializeUser(Client.deserializeUser());
    app.use(methodOverride("_method"));

    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.setHeader('Access-Control-Allow-Credentials', true);
      next()

    })


    app.all('/*', function(req, res, next) {

      var allowedOrigins = ['http://localhost:3000', 'http://localhost:9001'];
      var origin = req.headers.origin;
      if(allowedOrigins.indexOf(origin) > -1){
           res.setHeader('Access-Control-Allow-Origin', origin);
      }
      // CORS headers
      //res.header('Access-Control-Allow-Origin', 'http://webfeedback.investwell.com:3000, http://localhost:9000') // restrict it to the required domain
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
      res.setHeader('Access-Control-Allow-Credentials', true);
      // Set custom headers for CORS
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
      if (req.method == 'OPTIONS') {
        res.status(200).end()
      } else {
        next()
      }
    })

    app.use('/' , require('./routes'))

    // If no route is matched by now, it must be a 404
    app.use(function(req, res, next) {
      const err = new Error('API not found.')
      err.status = 404
      next(err)
    })


    app.listen(PORT, () => {
      console.log(`server listining at ${PORT}`)
    })
