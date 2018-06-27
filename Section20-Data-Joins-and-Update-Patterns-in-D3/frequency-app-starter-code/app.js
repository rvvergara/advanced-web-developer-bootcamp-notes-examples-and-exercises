// write your code here!
const   input   =   d3.select("input"),
        reset   =   d3.select("#reset"),
        phrase  =   d3.select("#phrase"),
        count   =   d3.select("#count"),
        letters =   d3.select("#letters");
    
let upData = [];

d3.select("form").on("submit",()=>{
    d3.event.preventDefault();
    
    let inputText       = input.property("value").toLowerCase(),
        enterData       = new Set(),
        dataObj         = freqObj(inputText,enterData),
        newData         = inputText.split(""),
        newCharCount    =   0;
        
    enterData = Array.from(enterData).sort();

    let updateSelect = d3.select("#letters")
                          .selectAll("div")
                          .data(enterData,d=>{
                            //   if(!upData.includes(d)) return d;
                            return d.character;
                          });
    updateSelect
        .classed("new",false)
        .exit()
        .remove();

    updateSelect
        .enter()                      
        .append("div")
        .text(d=>d)
        .classed("letter",true)
        .merge(updateSelect)
        .style("width","20px")
        .style("height",d=>`${dataObj[0][d]*20}px`)
        .style("line-height","20px")
        .style("margin-right","5px")
        .classed("new",d=>!upData.includes(d));

    phrase.text(`Analysis of: ${inputText}`);
    count.text(`(New characters: ${dataObj[1]})`);
    
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

function freqObj(word,set,dataArr){
    let dataObj = {},
        newCharCount = 0;

    for(let char of word){
        dataObj[char]===undefined?dataObj[char]=1:dataObj[char]++;
        set.add(char);
    }
    
    for(let letter of set) upData.includes(letter)?newCharCount:newCharCount++;

    return [dataObj,newCharCount];
}