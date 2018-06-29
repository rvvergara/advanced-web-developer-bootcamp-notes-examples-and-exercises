let minYr = birthData[0].year,
    maxYr = birthData[birthData.length-1].year,
    numBars = 12,
    width = 600,
    height = 600,
    barPadding = 10,
    barWidth = width/numBars - barPadding;

d3.select("input")
.property("min",minYr)
.property("max",maxYr)
.property("value",minYr);

d3.select("svg")
    .attr("width",width)
    .attr("height",height)
   .selectAll("rect")
   .data(birthData.filter(d =>d.year===minYr)) 
    .enter()
    .append("rect")
    .attr("width",barWidth)
    .attr("height",d=>d.births/2.5e6*height)
    .attr("y",d=>height-d.births/2.5e6*height)
    .attr("x",(d,i)=>{
        return (barWidth + barPadding)*i;
    })
    .attr("fill","purple")
    .attr("stroke","black")
    .attr("stroke-width","2");

d3.select("input").on("input",()=>{
    let yr = +d3.event.target.value;
    d3.selectAll("rect")
       .data(birthData.filter(d=>d.year === yr))
       .attr("height",d=>d.births/2.5e6*height)
       .attr("y",d=>height-d.births/2.5e6*height)
       .attr("x",(d,i)=>(barWidth+barPadding)*i)
})