var Express = require("express");
const mongoose = require('mongoose');
var cors=require("cors");
const multer=require("multer");
const { ObjectId } = require("mongodb");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://mcuser:injozi@cluster001.u3c91bi.mongodb.net/?retryWrites=true&w=majority";

const noteSchema = new mongoose.Schema({
    id: ObjectId,
    name: String,
    description: String
})

const Note = mongoose.model('Note', noteSchema);

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

app.get('/injoziproj/sample_airbnb/GetNotes', async(req,res)=>{
    try{
        const notes = await Note.find();
        res.json(notes);
    }catch(error){
        console.error("Error fetching notes:", error);
        res.status(500).send(error.toString());
    }
});
