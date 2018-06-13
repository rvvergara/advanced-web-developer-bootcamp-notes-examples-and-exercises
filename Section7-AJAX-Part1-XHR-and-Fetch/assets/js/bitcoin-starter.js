let XHR     =   new XMLHttpRequest(),
    btn     =   document.querySelector("button"),
    title   =   document.querySelector("title"),
    price   =   document.querySelector("#price");

function updatePrice(){
    XHR.onreadystatechange = function(){
        if(XHR.readyState == 4 && XHR.status == 200){
            let updatedPrice = "$ "+ (JSON.parse(XHR.responseText).bpi.USD.rate);
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

window.addEventListener("load",updatePrice);
btn.addEventListener("click",updatePrice);