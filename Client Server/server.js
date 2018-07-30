const express = require("express")
const app = express()
const port = 9001
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.static(__dirname +"/public"));
app.get("/:id/clientFeedbackForm", (req, res)=>{
  console.log("clientID in server.js",req.params.id);
  res.render("contactForm")
})

app.post("/:id/submitFeedback", (req, res) => {
  console.log(req.params.id)
  res.render("thankyouMessage")
})
app.listen(9001, ()=>{
  console.log(`Server is listinig at ${port}` )
})
