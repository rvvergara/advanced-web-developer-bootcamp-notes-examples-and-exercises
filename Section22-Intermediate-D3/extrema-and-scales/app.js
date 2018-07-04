let minYear = d3.min(birthData,d=>d.year),
    maxYear = d3.max(birthData,d=>d.year),
    width = 600,
    height = 600,
    padding = 50,
    barPadding = 10,
    numBars = 12,
    barWidth = (width-2*padding) / numBars - barPadding,
    maxBirths = d3.max(birthData,d=>d.births),
    yScale = d3.scaleLinear()
                .domain([0,maxBirths])
                .range([height,0]),

    yAxis = d3.axisLeft(yScale).tickSize(-width+2*padding).tickSizeOuter(0),

    input = d3.select("input")
                .property("min", minYear)
                .property("max", maxYear)
                .property("value", minYear),

    tooltip = d3.select("body")
                .append("div")
                  .classed("tooltip",true),   

    svg   = d3.select("svg")
                .attr("width", width)
                .attr("height", height);

    svg.append("g")
         .attr("transform",`translate(${padding},0)`)
        .call(yAxis);

createHistogram(minYear);

input
    .on("input",()=>createHistogram(+d3.event.target.value));

function createHistogram(year){
    let yrData = birthData.filter(d=>d.year === year),
        updateSelect  = svg
                          .selectAll("rect")
                          .data(yrData,d=>d.year);

    displayYear(input.property("value"));
    updateSelect
      .exit()
      .remove();

    updateSelect
       .enter()
       .append("rect")
       .merge(updateSelect)
          .attr("transform",`translate(${padding},0)`)
          .attr("width", barWidth)
          .attr("height", function(d) {
            return height - yScale(d.births);
          })
          .attr("y", function(d) {
            return yScale(d.births);
          })
          .attr("x", function(d,i) {
            return (barWidth + barPadding) * i;
          })
          .attr("fill", "purple")
          .on("mousemove",d=>showTooltip(d))
          .on("mouseout",()=>hideTooltip());
}

function displayYear(val){
  svg
    .selectAll(".display")
    .remove()

  svg.append("g")
       .classed("display",true)
       .attr("transform",`translate(${width/2},${height/25})`)
       .append("text")
       .text(val)
       .attr("font-size","1.5em")
       .attr("font-family","Arial")
       .attr("font-weight","bold");
}

function showTooltip(d){
  tooltip
    .style("opacity",1)
    .style("left",d3.event.x-tooltip.node().offsetWidth/2+"px")
    .style("top",d3.event.y+25+"px")
    .html(`<h4>${d.month}</h4>
            <p>${d.births.toLocaleString()} births</p>`)
}

function hideTooltip(){
  tooltip
    .style("opacity",0);
}