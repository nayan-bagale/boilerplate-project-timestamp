// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) =>{
  var stringDate = new Date();
  var ts = Math.round(stringDate.getTime() / 1000);
  res.json({unix: ts*1000,
           utc: stringDate.toUTCString()})
  console.log(stringDate)
  
})

app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
})

app.get("/api/:date", (req, res) => {
  if(req.params.date.length == 13){
    var stringDate = new Date(parseInt(req.params.date));
    res.json({unix: req.params.date,
             utc: stringDate.toUTCString()})
    console.log(req.params.date)
  }else{
    var stringDate = new Date(req.params.date);
    if(stringDate == "Invalid Date"){
      res.json({ error : "Invalid Date" })
    }else{
    var ts = Math.round(stringDate.getTime() / 1000);
    res.json({unix: ts*1000, 
              utc:  stringDate.toUTCString()})
    console.log(stringDate)
    }
  }

  console.log(typeof req.params.date + "  "+ req.params.date.length)
  console.log(parseInt(req.params.date))
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
