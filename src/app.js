const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// -------------------------Define Paths for Express Config-------------------------- //
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// -------------------------Setup handlebars engine and views location-------------------------- //
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// -------------------------Setup static directory to serve-------------------------- //
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pourya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Pourya Akn",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Pourya Akn",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  forecast(req.query.address, (error, forecastData) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      address: req.query.address,
      forecast: forecastData.weather_descriptions[0],
      wind_speed: forecastData.wind_speed,
      humidity: forecastData.humidity,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404 Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
