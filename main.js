const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const blogi = require("./models/blogi");

const portti = 3105;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { "extended" : true }));

app.use(express.static("./public"));

app.post("/tallenna/", (req, res) => {

    let uusiKirjoitus = {
                            "paivamaara" : new Date().getTime(),
                            "otsikko" : req.body.otsikko,
                            "nimimerkki" : req.body.nimimerkki,
                            "teksti" : req.body.teksti
                        };

    blogi.lisaaUusi(uusiKirjoitus, () => {

        res.redirect("/yllapito/");
        
    });


});

app.get("/", (req, res) => {

    blogi.haeKaikki( (kirjoitukset) => {

        res.render("index", { "kirjoitukset" : kirjoitukset});

    });
    

});

app.get("/yllapito/", (req, res) => {

    blogi.haeKaikki( (kirjoitukset) => {

        res.render("yllapito", { "kirjoitukset" : kirjoitukset});

    });

});


app.listen(portti, () => {

console.log(`Palvelin käynnistyi porttiin: ${portti}`);

});