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
let inquirer = require("inquirer");

//create new instance of Spotify using keys
var spotify = new Spotify(keys.spotify);

//global variables
let argv2 = process.argv[2];
let argv3 = process.argv.slice(3).join(' ');

inquirer.prompt([
    {
        type: "list",
        message: "Pick a form entertainment using Liri.",
        choices: ["Concert", "Song Title", "Movie Title", "Random"],
        name: "liribot"
    },{
        message: "Input the specifics.",
        name: "argv3"
    },
]).then (answers => {
    //switch case scenario
    switch (answers.liribot) {
        case "Concert":
            concertThis(answers.argv3);
            break;
        case "Song Title":
            spotifyThis(answers.argv3);
            break;
        case "Movie Title":
            movieThis(answers.argv3);
            break;
        case "Random":
            doThis(answers.argv3);
            break;
        default:
            console.log(`\nThat command cannot be found.\n-----------------------------\nPlease try one of the following:\n\t'concert-this'\n\t'spotify-this-song'\n\t'movie-this'\n\t'do-what-it-says'`)
    
    }
});


//function for finding a concert
function concertThis(artist) {
    //validation of whether an artist was added
    if (artist === "") {
        console.log(`Oops. You forgot to add an artist.`);
    }
    //call on link with id
    let link = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")

    //request and promise format
    request(link, function (err, response, body) {
        if (err) throw err;

        let res = JSON.parse(body)[0];
        //validation for if the artist has no upcoming concerts
        if (res === undefined) {
            console.log(`\n-------------------------------------\nSorry. It appears there are no scheduled concerts.\nPlease try a different artist.\n-------------------------------------\n`)
        } else {
            //if artist does have upcoming concerts print most recent 3 concerts
            console.log(`\n-------------------------------------\nArtist:\t${artist}\n ...Here are the next 3 concerts for ${artist}.`)

            for (var i = 0; i < 3; i++) {

                let res = JSON.parse(body)[i];
                console.log(`\t------------------------------\n\tVenue Name:\t${res.venue.name}\n\tVenue Location:\t${res.venue.city}. ${res.venue.country}\n\tDate of Event:\t${moment(res.datetime).format("MM/DD/YYYY")}`)

            }
            console.log(`-------------------------------------\n`)
        }
    });
}

//function for finding a song
function spotifyThis(song) {
    console.log("Spotify this result", song)
    axios({
        method: `get`,
        url: `http://api.spotify.com/v1/search=track:${song.target.songName.value}`
    })
}

//function for finding a movie
function movieThis(movie) {
    //if user forgets movie then replace with Mr. Nobody
    if (movie === ""){
        movie = "Mr. Nobody"
    }
    //axios call for OMDB
    axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`).then(
        function (response) {
            //return all the information
            console.log(`\n-------------------------------------\nInformation on ${response.data.Title}:\n-------------------------------------\n\tYear of Release:\t${response.data.Year}\n\tIMBD Rating:\t\t${response.data.imdbRating}\n\tTomatoes Rating:\t${response.data.Ratings[1].Value}\n\tCountry of Production:\t${response.data.Country}\n\tLanguage/s:\t\t${response.data.Language}\n\tPlot:\t\t\t${response.data.Plot}\n\tActors:\t\t\t${response.data.Actors}\n`);
        })
}

//function for finding commands in text file
function doThis(random) {
    console.log("Do this result", random)
}