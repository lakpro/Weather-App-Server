const express = require("express");
app = express();
var cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

app.use(cors());
//setting up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", function (req, res) {
//   //Weather API settings
//   const city = "London";
//   const apiKey = "59110e60e7c9db420fbeeef1f2f760d6";
//   const units = "metric";
//   axios
//     .get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
//     )
//     .then((response) => {
//       // console.log(response.data);
//       const location = response.data.name;
//       // const weather = response.data.weather[0].main;
//       // const temp = response.data.main.temp;
//       // const icon = response.data.weather[0].icon;
//       // const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
//       res.set("Content-Type", "text/html");
//       res.write("<h1>Location: " + location + "</h1>");
//       // res.write("<h3>The weather is " + weather + "</h3>");
//       // res.write("<h1>Current temperature is " + temp + " deg. celcius </h1>");
//       // res.write("<img src=" + imgUrl + ">");
//       res.send();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// app.post("/", function (req, res) {
//   console.log("Post request received");
//   console.log(req.body.name);
//   res.json({ name: "Lakshay" });
// });

app.get("/", function (req, res) {
  res.send("Server running SUCCESSFULLY!!");
});

app.post("/", function (req, res) {
  console.log("Post request received");
  //Weather API settings
  const city = req.body.name;
  const apiKey = "59110e60e7c9db420fbeeef1f2f760d6";
  const units = "metric";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    )
    .then((response) => {
      // console.log(response.data);
      const location = response.data.name;
      const weather = response.data.weather[0].main;
      const temp = response.data.main.temp;
      const icon = response.data.weather[0].icon;
      const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.json({
        location: location,
        weather: weather,
        temp: temp,
        icon: icon,
        imgUrl: imgUrl,
        error: false,
      });

      console.log("Data sent!!");
    })
    .catch((e) => {
      console.log(e);
      res.json({
        error: true,
      });
    });
});

app.listen(PORT, function () {
  console.log(`Server is running on PORT ${PORT}`);
});
