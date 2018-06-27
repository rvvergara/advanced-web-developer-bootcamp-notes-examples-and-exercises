// write your code here!
const   form    =   d3.select("form"),
        input   =   d3.select("input"),
        reset   =   d3.select("#reset"),
        phrase  =   d3.select("#phrase"),
        count   =   d3.select("#count"),
        letters =   d3.select("#letters");

let upData = [];

form.on("submit",()=>{
    d3.event.preventDefault();
    
    let inputText       = input.property("value").toLowerCase(),
        dataObj         = {},
        newData         = inputText.split(""),
        newCharCount    =   0,
        enterData       = new Set();

    d3.select("#letters")
      .selectAll("div")
         .remove();
    
    for(let char of inputText){
        dataObj[char]===undefined?dataObj[char]=1:dataObj[char]++;
        enterData.add(char);
    }

    enterData = Array.from(enterData).sort();

    for(let letter of enterData) upData.includes(letter)?newCharCount:newCharCount++;

    phrase.text(`Analysis of: ${inputText}`);
    count.text(`(New characters: ${newCharCount})`);

    let updateSelect = d3.select("#letters")
                          .selectAll("div")
                          .data(enterData,d=>{
                              if(!upData.includes(d)) return d;
                          }),
    enterSelect     = updateSelect.enter();
    
    updateSelect
        .classed("new",false);

    enterSelect
        .append("div")
        .text(d=>d)
        .classed("letter",true)
        .style("width","20px")
        .style("height",d=>`${dataObj[d]*20}px`)
        .style("line-height","20px")
        .style("margin-right","5px")
        .classed("new",d=>!upData.includes(d))

    upData = enterData;
    input.property("value","");
});

reset.on("click",()=>{
    phrase.text("");
    count.text("");
    input.property("value","");
    d3.selectAll(".letter").remove();
    upData = [];
})

