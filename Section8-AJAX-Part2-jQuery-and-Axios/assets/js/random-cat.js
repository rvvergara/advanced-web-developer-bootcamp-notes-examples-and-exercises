let url = "http://aws.random.cat/meow";
$("#btn").on("click",function(){
    $.get(url)
    .done(changeCat)
    .fail(function(err){
        console.log(err);
    })
});

function changeCat(data){
    $("#catImg").fadeOut(1000,function(){
        $(this)[0].src = data.file;
    });
    $("#catImg").fadeIn(1000)
}
