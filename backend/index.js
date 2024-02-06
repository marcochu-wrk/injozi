var Express = require("express");
const mongoose = require('mongoose');
var cors=require("cors");
const multer=require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://mcuser:injozi@cluster001.u3c91bi.mongodb.net/?retryWrites=true&w=majority";
var DATABASENAME = "injozidb";
var database;

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

app.get('/injoziproj/sample_airbnb/GetNotes', (request, response)=>{
    database.collection("listingsAndReviews").find({}).toArray((error,result)=>{
        response.send(result);
    })
})

app.post('/injoziproj/sample_airbnb/AddNotes', multer().none(),(request,response)=>{
    database.collection("listingsAndReviews").count({}), function(error,numOfDocs){
        database.collection("listingsAndReviews").insertOne({
            id:(numOfDocs+1).toString(),
            name:request.body.newNotes
        });
        response.json("Added to db");
    }
})

app.delete('/injozi/sample_airbnb/DeleteNotes',(request,repsonse)=>{
    database.collection("listingsAndReviews").deleteOne({
        id:request.query.id
    });
    repsonse.json("Deleted from db");
})