let XHR =   new XMLHttpRequest(),
    btn =   document.querySelector("#btn"),
    img =   document.querySelector("#photo");

XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200){
        img.classList.add("animate");
        img.setAttribute("src",JSON.parse(XHR.responseText).message);
    }
}

function changeImg(){
    XHR.open("GET","https://dog.ceo/api/breeds/image/random");
    XHR.send();
    img.classList.remove("animate");
}

btn.addEventListener("click",changeImg);
