var express = require("express");
const mongoose = require('mongoose');
var cors=require("cors");
const { ObjectId } = require("mongodb");
var app = express();

app.use(express.json());
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://mcuser:injozi@cluster001.u3c91bi.mongodb.net/?retryWrites=true&w=majority";

const playerSchema
 = new mongoose.Schema({
    id: ObjectId,
    name: String,
    score: Number
})

const Player = mongoose.model('Player', playerSchema
);

async function connect(){
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("connected to MongoDB");
    }
    catch(error) {
        console.log(error);
    }
}
connect();

app.listen(5003, ()=>{
    console.log("server started on port 5003");
});

app.get('/injoziproj/reflex_timer', async(req,res)=>{
    try{
        const player = await Player.find();
        res.json(player);
    }catch(error){
        console.error("Error fetching data:", error);
        res.status(500).send(error.toString());
    }
});

app.post('/injoziproj/reflex_timer', async(req,res)=>{
    try{
        const newPlayer = new Player({
            name: req.body.name,
            score: req.body.score
        });
        await newPlayer.save();
        res.status(201).json(newPlayer);
    }catch(error){
        console.error('Error adding new player:', error);
        res.status(500).send(error.toString());
    }   
});
