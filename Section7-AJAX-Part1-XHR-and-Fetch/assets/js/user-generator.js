let url         =   "https://randomuser.me/api/",
    btn         =   document.querySelector("#btn"),
    avatar      =   document.querySelector("#avatar"),
    fullname    =   document.querySelector("#fullname"),
    username    =   document.querySelector("#username"),
    email       =   document.querySelector("#email"),
    city        =   document.querySelector("#city"),
    animateColl =   [avatar, fullname, username, email, city];

function generateUser(){
    fetch(url)
    .then(handleError)
    .then(parseResponse)
    .then(newUSer)
    .catch(printError)
    toggleAnimation();
}

function handleError(response){
    if(!response) throw Error(response.status);
    return response;
}

function parseResponse(response){
    return response.json();
}

function newUSer(jsondata){
    toggleAnimation();
    let data = jsondata.results[0];
    avatar.src  =   data.picture.medium;
    fullname.textContent = data.name.first+" "+data.name.last;
    username.textContent = data.login.username;
    email.textContent   =   data.email;
    city.textContent    =   data.location.city;
}

function removeAnimation(){
    userProfile.classList.remove("animate");
}

function printError(err){
    alert(err);
}

function toggleAnimation(){
    for(el of animateColl){
        el.classList.toggle("animate");
    }
}

btn.addEventListener("click",generateUser);
