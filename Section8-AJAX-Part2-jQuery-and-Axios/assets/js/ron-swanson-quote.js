let xhrBtn     =   document.querySelector("#xhr"),
    fetchBtn   =   document.querySelector("#fetch"),
    axiosBtn   =   document.querySelector("#axios"),
    quoteDisp  =   document.querySelector("#quote"),
    url        =   "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

// Buttons event listeners
xhrBtn.addEventListener("click",xhrCallback); //XHR
fetchBtn.addEventListener("click",fetchCallback); //fetch()
$("#jquery").on("click",jqueryCallback); //jquery
axiosBtn.addEventListener("click",axiosCallback);//axios

/*
Callbacks
*/

// XHR Callback Function
function xhrCallback(){
    let XHR = new XMLHttpRequest();
    XHR.onreadystatechange = xhrOnReadState;
    XHR.open("GET",url);
    XHR.send();

    function xhrOnReadState(){
        if(XHR.readyState == 4 && XHR.status == 200){
            $("#quote").fadeOut(function(){
                quoteDisp.textContent = JSON.parse(XHR.responseText)[0];
            });
            $("#quote").fadeIn();
        }
    }
}
// Fetch Callback Function
function fetchCallback(){
    fetch(url)
    .then(parseData)
    .then(displayData)
    .catch(handleError);
}
// jquery Callback Function
function jqueryCallback(){
    $.get(url)
    .done(displayData)
    .fail(handleError);
}
// Function to parse response data into json for fetch
function parseData(data){
    return data.json();
}
// axios callback
function axiosCallback(){
    axios.get(url)
    .then(axiosParse)
    .then(displayData)
    .catch(handleError);
}
// Function to parse axios return data
function axiosParse(data){
    return Promise.resolve(data.data);
}
// Function to display data by fading in - except for XHR
function displayData(data){
    $("#quote").fadeOut(function(){
        $("#quote").text(data[0]);
    })
    $("#quote").fadeIn();
}
// Error handler
function handleError(err){
    alert("SOMETHING WENT WRONG!!!");
}