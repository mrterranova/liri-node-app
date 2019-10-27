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
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doThis();
        break;
}

