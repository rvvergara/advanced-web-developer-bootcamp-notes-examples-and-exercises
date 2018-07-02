let width = 600, height = 600, barPadding = 1,
    minYr = d3.min(birthData,d=>d.year),
    yrData = birthData.filter(d=>d.year === minYr),
    xScale = d3.scaleLinear().domain([0,d3.max(yrData,d=>d.births)]).range([0,width]),
    hist = d3.histogram()
             .domain(xScale.domain())
             .thresholds(xScale.ticks())
             .value(d=>d.births),
    bins = hist(yrData),
    yScale = d3.scaleLinear().domain([0,d3.max(bins,d=>d.length)]).range([height,0]),
    barWidth = width/bins.length - barPadding,
    bars    = d3.select("svg")
                 .attr("width",width)
                 .attr("height",height)
                 .selectAll(".bars")
                 .data(bins)
                 .enter()
                 .append("g")
                 .classed("bars",true);
    
    bars
      .append("rect")
      .attr("x",d=>xScale(d.x0))
      .attr("y",d=>yScale(d.length))
      .attr("width",d=>xScale(d.x1) - xScale(d.x0) - barPadding)
      .attr("height",d=>height - yScale(d.length))
      .attr("fill","purple")
      .attr("stroke","yellow")
      .attr("stroke-width","1px");

    bars
      .append("text")
      .text(d=>`${d.x0} - ${d.x1}, bin length: ${d.length}`)
      .attr("transform","rotate(-90)")
      .attr("x",d=>10-height)
      .attr("y",d=>(xScale(d.x0)+xScale(d.x1))/2)
      .attr("alignment-baseline","middle")


