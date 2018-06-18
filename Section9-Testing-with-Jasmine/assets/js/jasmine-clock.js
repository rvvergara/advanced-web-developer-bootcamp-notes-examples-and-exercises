function getUserInfo(username){
    return fetch("http://api.github.com/users/"+username)
    .then(function(res){
        return res.json();
    })
}