// we'll write this code together
let width = 600, height = 600, barPadding = 1,
    minYear = d3.min(birthData,d=>d.year),
    
    yearData = birthData.filter(d=>d.year === minYear),

    xScale = d3.scaleLinear().domain([0,d3.max(yearData,d=>d.births)]).rangeRound([0,width]),
    
    histogram = d3.histogram()
                  .domain(xScale.domain())
                  .thresholds(xScale.ticks())
                  .value(d=>d.births),
    
    bins    = histogram(yearData),

    barWidth = width / bins.length - barPadding,
    
    yScale = d3.scaleLinear().domain([0,d3.max(bins,d=>d.length)]).range([height,0]),

    bars = d3.select("svg")
               .attr("width",width)
               .attr("height",height)
             .selectAll(".bar")
               .data(bins)
               .enter()
               .append("g")
               .classed("bar",true)
bars
  .append("rect")
  .attr("x",(d,i)=>xScale(d.x0))
  .attr("y",d=>yScale(d.length))
  .attr("width",d=>xScale(d.x1) - xScale(d.x0) - barPadding)
  .attr("height",d=>height-yScale(d.length))
  .attr("fill","purple");
    
bars
    .append('text')
        .text(d=>`${d.x0} - ${d.x1} (bar height: ${d.length})`)
        .attr("transform","rotate(-90)")
        .attr("y",d=>(xScale(d.x1)+xScale(d.x0)/2))
        .attr("x",-height+10)
        .style("alignment-baseline","middle")