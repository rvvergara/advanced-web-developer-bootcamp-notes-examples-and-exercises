/*
1. Write a function called hasMostFollowers, which accepts a variable number of arguments. You should then make an AJAX call to the Github User API (https://developer.github.com/v3/users/#get-a-single-user) to get the name and number of followers of each argument. The function should return a string which displays the username who has the most followers. 

Hint - Try to use Promise.all to solve this and remember that the jQuery AJAX methods ($.getJSON, $.ajax, etc.) return a promise.
*/

async function hasMostFollowers(...args){
    let baseUrl = `https://api.github.com/users/`,
        users = await Promise.all(args.map(val=>fetch(baseUrl+val).then(data=>data.json())));
    let mostPopular = users.sort((a,b)=>a.followers<b.followers)[0];
    console.log(`${mostPopular.name} has the most followers at ${mostPopular.followers}`);
}

/*
2. Write a function called starWarsString, which accepts a number. You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) to search for a specific character by the number passed to the function. Your function should return a promise that when resolved will console.log the name of the character.

    starWarsString(1).then(function(data){
        console.log(data)
    })
     
    "Luke Skywalker"
*/

async function starWarsString(id){
    let bio = "",
        url = `https://swapi.co/api/people/${id}`,
        person = fetch(url).then(res=>res.json()),
        film = person.then(data=>fetch(data.films[0])).then(res=>res.json()),
        planet = film.then(data=>fetch(data.planets[0])).then(res=>res.json());
    
    let personData = await person,
        filmData = await film,
        planetData = await planet
        yearShown = filmData.release_date.slice(0,4);

    bio+=`${personData.name} first appeared in ${filmData.title} (episode ${filmData.episode_id}), directed by ${filmData.director} which was shown in the year ${yearShown}. ${personData.name} has ${personData.hair_color} hair and ${personData.skin_color} complexion. ${filmData.title} started in the planet ${planetData.name} which is characterized by a ${planetData.climate} and ${planetData.terrain}.`
    console.log(bio);
}