// write your code here!
let width = 800,
    height = 110,
    barPadding = 10,
    svg = d3.select("svg")
              .attr("width",width)
              .attr("height",height);


d3.select("form").on("submit",()=>{
    d3.event.preventDefault();

    let inputText = d3.select("input").property("value").toLowerCase(),
        enterData = Array.from(new Set(inputText.split("").sort())),
    
    barWidth = width/enterData.length - barPadding;

    updateSelect = svg
                     .selectAll(".letter")
                       .data(enterData,d=>d);
    
    updateSelect
    .classed("new",false)
    .exit()
    .remove();
               
    let dataGrp     =  updateSelect
                      .enter()
                      .append("g")
                      .classed("letter",true)
                      .classed("new",true);

    dataGrp
      .append("rect");

    dataGrp
      .append("text");

    dataGrp
       .merge(updateSelect)
       .select("rect")
        .attr("x",(d,i)=>(barPadding+barWidth)*i)
        .attr("y",d=>height-frequency(inputText)[d]*20)           
        .attr("width",barWidth)
        .attr("height",d=>frequency(inputText)[d]*20);       

    dataGrp
        .merge(updateSelect)
        .select("text")
        .text(d=>d)
        .attr("font-size","1.5em")
        .attr("x",(d,i)=>(barPadding+barWidth)*i+barWidth/2)
        .attr("y",d=>height-frequency(inputText)[d]*20-10)
        .attr("fill","black");
    
    d3.select("#phrase").text(`Analysis of: ${inputText}`);
    d3.select("#count").text(`(New characters: ${updateSelect.enter().nodes().length})`)
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
