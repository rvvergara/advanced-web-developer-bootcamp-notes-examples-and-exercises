// write your code here!
const   form    =   d3.select("form"),
        input   =   d3.select("input"),
        reset   =   d3.select("#reset"),
        phrase  =   d3.select("#phrase"),
        count   =   d3.select("#count"),
        letters =   d3.select("#letters");

let data = [];

form.on("submit",()=>{
    d3.event.preventDefault();
    let inputText       = input.property("value").toLowerCase(),
        newText        =  inputText.concat(data.join("")),
        oldLength      = data.length,
        dataSet    = new Set();

    for(char of newText) dataSet.add(char);

    data = Array.from(dataSet).sort();
    
    count.text(`(New characters: ${data.length - oldLength})`)

    let updateSelect = d3.select("#letters")
    .selectAll("div")
      .data(data),
      
      enterSelect = updateSelect
        .enter();
    
    console.log("updateSelect",updateSelect);
    console.log("enterSelect",enterSelect);    
   
    d3.selectAll(".letter").remove();
    
    updateSelect
        .classed("new",d=>!data.includes(d));
        
    enterSelect
        .append("div")
        .text(d=>d)
        .style("height",d=>{
            let occ = [...inputText].filter(l=>l===d).length;
            return `${occ*20}px`
        })
        .style("width","20px")
        .style("margin-right","5px")
        .classed("letter new",true)

        input.property("value","");
});

reset.on("click",()=>{
    phrase.text("");
    count.text("");
    input.property("value","");
    d3.selectAll(".letter").remove();
    data = [];
})

