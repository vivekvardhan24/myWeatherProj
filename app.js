const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

const https = require("https");

app.get("/",function(req,response){
    console.log("post received");
    response.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    console.log(req.body.city);
    const city = req.body.city;
    const apiKey = "9343363c9a5ee30532ce50572e3eb9f8";
    const unit = "metric";
    const url = "https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b6907d289e10d714a6e88b30761fae22"
        https.get(url, function(weatherAPIresponse){
            weatherAPIresponse.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp-273.15;
            res.write("<h1>The temperature in "+city+" is "+temp+" celcius</h1>");
            res.write("<img src='https://openweathermap.org/img/wn/10d@2x.png'>");
            res.send();
            })
        })

})



app.listen(3000, function(){
    console.log("Server has started");
})