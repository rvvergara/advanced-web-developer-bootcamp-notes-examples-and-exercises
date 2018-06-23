/*
1. Write a function called getMostFollowers, which accepts a variable number of arguments. You should then make an AJAX call to the Github User API (https://developer.github.com/v3/users/#get-a-single-user) to get the name and number of followers of each argument. The function should return a promise, which when resolved, returns a string which displays the username who has the most followers. 

Hint - Try to use Promise.all to solve this and remember that the jQuery AJAX methods ($.getJSON, $.ajax, etc.) return a promise.

getMostFollowers('elie','tigarcia','colt').then(function(data){
    console.log(data)
});
*/
let getMostFollowers = (...args) =>{
    let url = `https://api.github.com/users/`
    let promiseArr = args.map(user => fetch(url+user).then(data=>data.json()));
    return Promise.all(promiseArr)
    .then(data => determineMax(data))
    .catch(err => handleErr(err));
}

let handleErr = err => console.log(err);

function determineMax(users){
    let mostFollowers = users.sort((x,y)=>x<y)[0];
    console.log(`${mostFollowers.login} has the most followers at ${mostFollowers.followers}`)
}

/*
2. Write a function called starWarsString, which accepts a number. You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) to search for a specific character by the number passed to the function. Your function should return a promise that when resolved will console.log the name of the character.

    starWarsString(1).then(function(data){
        console.log(data)
    })
     
    "Luke Skywalker"
*/
let starWarsString = num => {
    let charDesc = "";
    return new Promise((resolve,reject)=>{
        let url = `https://swapi.co/api/people/${num}`;
        fetch(url).then(response=>response.json())  
        .then(data =>{
            charDesc+=data.name;
            return fetch(data.films[0]).then(data=>data.json())
        })
        .then(film=> {
            let year_shown = film.release_date.slice(0,4)
            charDesc+=` first appeared in ${film.title} (Episode ${film.episode_id}) which was directed by ${film.director} shown in ${year_shown}.`;
            return fetch(film.planets[0]).then(data=>data.json());
        })
        .then(planet=>{
            charDesc+=`The film opens up in the planet ${planet.name} characterized by a ${planet.terrain} terrain.`
            console.log(charDesc);
        })
        .catch(err => handleErr(err));    
    })
}