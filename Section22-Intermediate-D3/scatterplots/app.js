let width   =   500, height = 500, padding = 20,
    yScale  =   d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.lifeExpectancy)).range([height-padding,padding]),
    xScale  =   d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.births/d.population)).range([padding,width-padding]),
    colorScale =   d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.population/d.area)).range(["lightgreen","black"]),
    radiusScale = d3.scaleLinear().domain(d3.extent(birthData2011,d=>d.births)).range([2,40]);

let svg =   d3.select("svg")
                .attr("width",width)
                .attr("height",height);

let updateSelection =   svg
      .selectAll("circle")
      .data(birthData2011);

updateSelection
    .enter()
    .append("circle")
    .attr("cx",d=>xScale(d.births/d.population))
    .attr("cy",d=>yScale(d.lifeExpectancy))
    .attr("r",d=>radiusScale(d.births))
    .attr("fill",d=>colorScale(d.population/d.area))

