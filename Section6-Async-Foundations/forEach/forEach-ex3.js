var strings = ["my", "forEach", "example"];

var result = "";
forEach(strings, function(str, index, array) {  
  if (array.length - 1 !== index){
    result += str + " ";
  } else {
    result += str + "!!!";
  }
});

