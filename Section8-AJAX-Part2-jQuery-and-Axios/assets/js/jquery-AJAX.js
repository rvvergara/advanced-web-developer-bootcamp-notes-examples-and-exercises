$("#btn").on("click",function(){
    $.ajax({
        method: "GET",
        url: "https://baconipsum.com/api/?type=meat-and-filler",
        dataType: "JSON",
    })
    .done(randomP)
    .fail(function(err){
        $("p").text("Something went wrong.. Cannot retrieve data");
    })
});

function randomP(data){
    $("p").fadeOut(function(){
        $(this).text(data[0]);
        $(this).fadeIn();
    })
}