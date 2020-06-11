/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const baseUrl = 'api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=49652684bf08ec0131207130678a15be';

console.log(newDate);



const postData = async (url = '', data = {})=>{
    const response = await fetch(url ,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    });
    try{
        console.log(data);
        const res = await response.json();
        return res;
    }
    catch(error){
        console.log(error);
    }
       
};

document.getElementById('generate').addEventListener('click', postDataAction);

function postDataAction(){
    const zipDiv = document.getElementById('zip');
    const feelingsDiv = document.getElementById('feelings');
    postData('/add' , {date:newDate , zip:zipDiv.value , feeling:feelingsDiv.value})
    .then(getData()); 
}

const getData = async ()=>{
    const zipDiv = document.getElementById('zip');
    const urlf = baseUrl + zipDiv.value + key;
    console.log(urlf);
    const re  = await fetch(urlf);
    try{
        const data = await re.json();
        console.log(re.json());
    }
    catch(error){

    }
}

getData(); 