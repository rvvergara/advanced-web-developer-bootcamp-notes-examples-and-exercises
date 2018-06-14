let url = "https://api.github.com/users/rvvergara",

dataObj = {
    name: "Ryan",
    login: "rvvergara",
}

$("#getBtn").on("click",function(){
    $.get(url)
    .done(function(data){
        console.log(data.login,data.blog,data.location);
    })
    .fail(function(err){
        console.log(err);
    })
});

$("#postBtn").on("click",function(){
    let url2 = "https://practice-blog-site.herokuapp.com/login"
    $.post(url,dataObj)
    .done(function(data){
        console.log(data);
    })
    .fail(function(err){
        console.log(JSON.parse(err.responseText).message);
    });
});

$("#getJSONBtn").on("click",function(){
    $.getJSON(url)
    .done(function(res){
        console.log(res.node_id);
    })
    .fail(function(err){
        console.log(err.responseText);
    });
});