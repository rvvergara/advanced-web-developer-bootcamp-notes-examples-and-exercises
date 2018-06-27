// write your code here!
d3.select("form").on("submit",()=>{
    let inputText = d3.select("input").property("value").toLowerCase(),
        enterData = Array.from(new Set(inputText.split("").sort())),
        updateSelect = d3.select("#letters")
                         .selectAll("div")
                         .data(enterData,d=>d),
        enterSelect = updateSelect.enter();

    d3.event.preventDefault();
    
    updateSelect
      .classed("new",false)
      .exit()
      .remove();

    enterSelect
      .append("div")
      .classed("new",true)
      .text(d=>d)
    .merge(updateSelect)
      .classed("letter",true)                   
      .style("width","20px")
      .style("height",d=>`${frequency(inputText)[d]*20}px`)
      .style("line-height","20px")
      .style("margin-right","5px");  

    d3.select("#phrase").text(`Analysis of: ${inputText}`);
    d3.select("#count").text(`(New characters: ${enterSelect.nodes().length})`)
    d3.select("input").property("value","");  
});

d3.select("#reset").on("click",()=>{
    d3.select("#phrase").text("");
    d3.select("#count").text("");
    d3.selectAll(".letter").remove();
})

function frequency(str){
    let obj = {}
    for(let letter of str.split("")) obj[letter]===undefined?obj[letter]=1:obj[letter]++;
    return obj;
}
