//IMPORTED PACKAGES
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//IMPORTANT GLOBAL VALUES
const app = express();
const PORT = 3000;

//IMPORTANT USE OF PACKAGES
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//SET API URL
const API_URL = "https://riddles-api.vercel.app/random";

//SET QUESTIONS AND CORRECT ANSWERS ARRAY
let games = [
    
];

//SET USER'S GUESSES ARRAY
let guesses = [
    
];

//SET ID OF QUESTION AND GUESS
let id = 0;

//RENDER WELCOMING PAGE
app.get("/",async (req,res)=>{
    try {
        res.render("welcoming.ejs");
    } catch(err) {
        res.render("welcoming.ejs");
        console.log(err);
    }
});

//RENDER GAME PAGE TO GET QUESTION
app.get("/game",async (req,res)=>{
    try {
        const response = await axios.get(API_URL);
        const result = response.data;
        const riddle = result.riddle;
        const answer = result.answer.toUpperCase();
        console.log(`ID: ${id}`);
        console.log(riddle);
        console.log(`ANSWER:  ${answer}`);
        const game = {
            id:id,
            riddle: riddle,
            answer: answer
        }
        games.push(game);
        console.log(`ID OF ARRAY: ${games[id].id}`);
        res.render("game.ejs",{
            riddle: game.riddle,
            answer:game.answer
        });
        id++;
        console.log(`ID AFTER CHANGE: ${id}`);
    } catch (err) {
        res.render("game.ejs");
        console.log(err);
    }
});

//CHECK GAME ANSWER TO GET CORRECT PAGE
app.post("/game",async (req,res)=>{
    try {
        var gid = id-1;
        console.log(`GID: ${gid}`);
        //GET ANSWER
        const answer = games[gid].answer;
        console.log(`ANSWER WITH GID ${answer}`);
        //GET GUESS
        const guess = {
            id:gid,
            guess:req.body.guess.toUpperCase()
        }
        guesses.push(guess);
        const temp = guesses[gid].guess;
        console.log(`GUESS WITH GID: ${temp}`);
        if (temp == answer) {
            res.render("won.ejs");
        } else {
            res.render("death.ejs");
        }
        gid++;
        console.log(`GID AFTER CHANGE: ${gid}`);
    } catch (err) {
        res.render("game.ejs");
        console.log(err);
    }
});

//RENDER DEATH PAGE
app.get("/death",async (req,res)=>{
    try {
        res.render("death.ejs");
    } catch(err) {
        res.render("death.ejs");
        console.log(err);
    }
});

//RENDER WINNING PAGE
app.get("/won",async (req,res)=>{
    try {
        res.render("won.ejs");
    } catch(err) {
        res.render("won.ejs");
        console.log(err);
    }
});

//SERVER STARTUP MESSAGE
app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})