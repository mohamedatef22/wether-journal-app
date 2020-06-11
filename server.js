// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8000;
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app

const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.listen(port , ()=> {
    console.log(`server running on port : ${port}`);
});


app.post('/add' , postRequest);
app.get('/all' , getRequest);

function postRequest(req, res){
    const newData = {date:req.body.date , zip:req.body.zip , feeling:req.body.feeling};
    projectData['date']= req.body.date;
    projectData['temp'] = req.body.zip;
    projectData['feeling'] = req.body.feeling;
    console.log(projectData);    
};


function getRequest(req , res){
    console.log('getrec')
    res.send(projectData);
}