let XHR     =   new XMLHttpRequest(),
    btn     =   document.querySelector("button"),
    title   =   document.querySelector("title"),
    price   =   document.querySelector("#price"),
    form    =   document.querySelector("form"),
    currencies = document.querySelectorAll("input[type='radio']"),
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
    XHR.onreadystatechange = function(){
        if(XHR.readyState == 4 && XHR.status == 200){
            let updatedPrice = selectCurrency(currencies)[1]+" "+ (JSON.parse(XHR.responseText).bpi[selectCurrency(currencies)[0]].rate);
            updatedPrice = updatedPrice.slice(0,updatedPrice.length-2);
            price.classList.add("animate");
            price.textContent = updatedPrice;
            title.textContent = updatedPrice+" - Bitcoin Price Exercise | AJAX"
        }
    }
    XHR.open("GET","https://api.coindesk.com/v1/bpi/currentprice.json");
    XHR.send();
    price.classList.remove("animate");
}

setInterval(updatePrice,30000);

form.addEventListener("change",updatePrice);
window.addEventListener("load",updatePrice);
btn.addEventListener("click",updatePrice);