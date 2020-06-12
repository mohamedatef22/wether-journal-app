/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=49652684bf08ec0131207130678a15be';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', postDataAction);

function postDataAction(event){
    const feelingsDiv = document.getElementById('feelings');
    getData()
    .then(function(data){
        postData('/add' , {date:newDate , temp: data.main.temp , feeling:feelingsDiv.value});
    })
    .then(function(data){
        updateUi();}); 
};

const postData = async (url = '', data = {}) =>{
    const response = await fetch(url ,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const res = await response.json();
        return res;
    }
    catch(error){
        console.log("error",error);
    }    
};


const getData = async ()=>{
    const zipDiv = document.getElementById('zip');
    const re  = await fetch(baseUrl + zipDiv.value + key);
    try{
        const returnedData = await re.json();
        return(returnedData);
    }
    catch(error){
        console.log(error);
    }
}


const updateUi = async ()=>{
    const response = await fetch('/all');
    try{
        const data = await response.json();
        document.getElementById('date').innerHTML = "<i class=\"far fa-calendar-alt\"></i>" + data.date;
        document.getElementById('temp').innerHTML = "<i class=\"fas fa-thermometer-half\"></i>" + data.temp;
        document.getElementById('content').innerHTML = "<i class=\"far fa-comment-alt\"></i>" + data.feeling;
    }
    catch(error){
        console.log(error);
    }
}