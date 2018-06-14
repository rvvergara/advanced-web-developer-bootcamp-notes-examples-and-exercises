let currencySyms = {
    EUR: "€",
    USD: "$",
    GBP: "£",
},
reqObj = {
    method:"GET",
    url: "https://api.coindesk.com/v1/bpi/currentprice.json",
};

$("button").on("click",getData);
$("input[type='radio']").on("click",getData);
$(window).on("load",getData);
setInterval(getData,30000);

function getData(){
    $.ajax(reqObj)
    .done(updatePrice)
    .fail(handleError);
}

function updatePrice(data){
    data = JSON.parse(data);
    $("#price").fadeOut(fadeData);

    function fadeData(){
        let currency = selectCurrency(),
            unit     = currencySyms[currency],
            amount   = data.bpi[currency].rate;
        $(this).text(unit+" "+amount.slice(0,amount.length-2)).fadeIn();
    }
}

function selectCurrency(){
    return $("input[type='radio']:checked")[0].id;
}

function handleError(err){
    $("#price").text("There was a problem retrieving data");
}