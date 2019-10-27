//require .env file containing passwords
require("dotenv").config();

//require keys file that hold Spotify secret and code
var keys = require("./keys.js");

//require all other files needed for project
let fs = require("fs");
let Spotify = require("node-spotify-api");
let request = require('request');
let moment = require('moment');
let axios = require("axios");

//create new instance of Spotify using keys
var spotify = new Spotify(keys.spotify);

//global variables
let argv2 = process.argv[2];
let argv3 = process.argv.slice(3).join(' ');

//switch case scenario
switch (argv2) {
    case "concert-this":
        concertThis(argv3);
        break;
    case "spotify-this-song":
        spotifyThis(argv3);
        break;
    case "movie-this":
        movieThis(argv3);
        break;
    case "do-what-it-says":
        doThis(argv3);
        break;
}

function concertThis(artist) {
    console.log("Concert this result", artist)
    let link = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")

    request(link, function (err, response, body) {
        if (err) throw err;  

        let res = JSON.parse(body)[0];
        if (res === undefined) {
            console.log(`\n-------------------------------------\nSorry. It appears ${artist} has no scheduled concerts.\nPlease try a different artist.\n-------------------------------------\n`)
        } else {
            console.log(`\n-------------------------------------\nArtist:\t${artist}\n ...Here are the next 3 concerts for ${artist}.`)

            for (var i = 0; i < 3; i++) {

                let res = JSON.parse(body)[i];
                console.log(`\t------------------------------\n\tVenue Name:\t${res.venue.name}\n\tVenue Location:\t${res.venue.city}. ${res.venue.country}\n\tDate of Event:\t${moment(res.datetime).format("MM/DD/YYYY")}`)
                
            }
            console.log(`-------------------------------------\n`)
        }
    });
}

function spotifyThis(song) {
    console.log("Spotify this result", song)
}
function movieThis(movie) {
    console.log("Movie this result", movie)
}
function doThis(random) {
    console.log("Do this result", random)
}