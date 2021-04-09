const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {


  const query = req.body.cityName;
  const apiId = "2055374b5b8bb9e995396b3429f22d8b";
  const units = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiId + "&units=" + units;

  https.get(url, function(response){

    response.on("data", function(data){

    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;

    res.write("<h1>The temperature in " + query +" is " + temp + " degrees Celsius</h1>");
    res.write("<p>The weather is currently " + description + "<p>");
    res.write("<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png>");
    res.send();

    })

  });

});



app.listen(3000, function(){
  console.log("server is running on port 3000");
});
