const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./ultis/geocode");
const forecast = require("./ultis/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const paritalsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicPath));
hbs.registerPartials(paritalsPath);

// routes
app.get("", (req, res) => {
    res.render("index", { title: "IDNEX PAGE" });
});
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "No address sent!!" });
    }

    geocode(req.query.address, (geoErr, geoRes) => {
        if (geoErr) {
            return res.send({ error: geoErr });
        }
        forecast(geoRes.long, geoRes.lat, (foreErr, foreRes) => {
            if (foreErr) {
                return res.send({ error: foreErr });
            }
            res.send({ geocode: geoRes, forecast: foreRes });
        });
    });
});
app.get("/help", (req, res) => {
    res.render("help", { title: "HELP PAGE" });
});
app.get("/about", (req, res) => {
    res.render("about", { title: "ABOUT PAGE" });
});
app.get("/products", (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({ error: "No searches sent!!" });
    }
    res.send({ product: [] });
});

app.get("*", (req, res) => {
    res.send("My 404 page");
});


app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
