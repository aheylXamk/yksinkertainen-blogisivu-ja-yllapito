const fs = require("fs");
const tiedostonimi = "./models/kirjoitukset.json";



module.exports = {

    "haeKaikki" : (callback) => {

        fs.readFile(tiedostonimi, "utf-8", (err, data) => {

            if (err) throw err;

            callback(JSON.parse(data));

        });
        

    },

    "lisaaUusi" : (uusi, callback) => {

        fs.readFile(tiedostonimi, "utf-8", (err, data) => {

            if (err) throw err;

            let kirjoitukset = JSON.parse(data);

            kirjoitukset.unshift(uusi);

            fs.writeFile(tiedostonimi, JSON.stringify(kirjoitukset), (err) => {

                if (err) throw err;

                callback();
            });
        });
    }


};