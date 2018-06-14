let XHR     =   new XMLHttpRequest(),
    btn     =   document.querySelector("button"),
    title   =   document.querySelector("title"),
    price   =   document.querySelector("#price"),
    form    =   document.querySelector("form"),
    currencies = document.querySelectorAll("input[type='radio']"),
    currentPrice = "",
    currency = "",
    currencySyms = {
            EUR: "€",
            USD: "$",
            GBP: "£",
        },
    sym = "";

function selectCurrency(arr){
    for(let radio of arr){
        if(radio.checked){
            currency = radio.id;
            sym = currencySyms[currency];
        }
    }
    return [currency,sym];
}

function updatePrice(){
    fetchPrice()
    .then(formatPrice)
    .then(updateDisplay);
    price.classList.remove("animate");
}

function fetchPrice(){
    return fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then(function(res){
        return res.json(); 
     })
     .then(function(res){
         return Promise.resolve(res.bpi);
     });
}

function formatPrice(res){
    currentPrice = res[selectCurrency(currencies)[0]].rate;
    return Promise.resolve(currentPrice.slice(0,currentPrice.length-2));
}

function updateDisplay(currentPrice){
    price.classList.add("animate");
    currentPrice = selectCurrency(currencies)[1]+" "+currentPrice;
    price.textContent = currentPrice;
    title.textContent = currentPrice+" - Bitcoin Price Exercise | AJAX"
}

setInterval(updatePrice,30000);

form.addEventListener("change",updatePrice);
window.addEventListener("load",updatePrice);
btn.addEventListener("click",updatePrice);