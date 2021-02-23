const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.get("", (req, res) => {
  res.render("index", {
    title: "weathe app",
    name: "sahil",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "sahil",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "sahil",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address.",
    });
  }

  geocode(req.query.address,(error,{latitude,longitude,location} ={}) => {
    if(error){
        return res.send({error});
    }
    forcast(latitude,longitude,(error,forcatData) => {
        if(error){
            res.send({error});
        }
        const data = forcatData.weather_descriptions + " .It currently " +forcatData.temperature +" degree out here";
        res.send({
            forcast:data,
            location,
            address:req.query.address
        })
    })
  })
  
  
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help page not found",
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide one search",
    });
  }
  res.send({
    product: [],
  });
});

// to map everything else express provides us a wildcard charater
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404 page not found.",
  });
});

app.listen(port, () => {
  console.log("server is running on port "+port);
});
