const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const request = require("request");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3000;
const app = express();
app.set("view engine", "hbs");
app.set("views", viewsPath);
// app.set("partials", partialsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ashish Kumar Naik",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ashish Kumar Naik",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "help",
    name: "Ashish Kumar Naik",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Ashish Kumar Naik",
    errorMessage: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must provide an address" });
  }
  geocode.geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast.forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send.error;
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ashish Kumar Naik",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
  console.log(publicDirectoryPath);
});
