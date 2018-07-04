// write your code here!
let width   =   800, height = 600, padding = 40,

    litRateScale = d3.scaleLinear().domain(d3.extent(regionData,d=>d.adultLiteracyRate)).range([padding,width-padding]),

    subscriberScale = d3.scaleLinear().domain(d3.extent(regionData,d=>d.subscribersPer100)).range([height-padding,padding]),

    radiusScale = d3.scaleLinear().domain(d3.extent(regionData,d=>d.urbanPopulationRate)).range([5,30]),

    xAxis = d3.axisBottom(litRateScale).tickSize(-height+2*padding).tickSizeOuter(0),

    yAxis = d3.axisLeft(subscriberScale).tickSize(-width+2*padding).tickSizeOuter(0),

    colorScale = d3.scaleLinear().domain(d3.extent(regionData,d=>d.extremePovertyRate)).range(["yellow","red"]),

    povertyLevelForLegend = [0,1,2,3,4,5],

    legendColorScale = d3.scaleLinear().domain(d3.extent(povertyLevelForLegend)).range(["yellow","red"]),

    tooltip     = d3.select("body")
                    .append("div")
                      .classed("tooltip",true),

    svg =  d3.select("svg")
                .attr("width",width)
                .attr("height",height),
    
    circUpd = d3.selectAll("circle")
                    .data(regionData)
                    .transition(),

    updateSelect = svg
                   .selectAll("circle")
                     .data(regionData);

    svg
      .append("g")
      .attr("transform",`translate(0,${height-padding})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform",`translate(${padding},0)`)
      .call(yAxis);

    updateSelect
        .enter()
        .append("circle")
        .transition()
        .duration(2000)
        .delay((d,i)=>i*100)
        .attr("cx",d=>litRateScale(d.adultLiteracyRate))
        .attr("cy",d=>subscriberScale(d.subscribersPer100))
        .attr("r",d=>radiusScale(d.urbanPopulationRate))
        .attr("fill",d=>colorScale(d.extremePovertyRate))
        .attr("stroke-width","0.5")
        .attr("stroke","green");

    d3.selectAll("circle")
        .on("mousemove",d=>showTooltip(d))
        .on("touchstart",d=>showTooltip(d))
        .on("mouseout",d=>hideTooltip())

    svg
        .append("text")
        .attr("x",width/2)
        .attr("y",height-padding)
        .attr("dy","1.5em")
        .text("Adult Literacy Rate")
        .attr("font-weight","bold");


    svg
        .append("text")
        .attr("x",height/3)
        .attr("y",0-0.18*padding)
        .attr("dy","0.22em")
        .text("Cellular subscribers per 100")
        .attr("transform","rotate(90)")
        .attr("font-weight","bold");


    svg
        .append("text")
        .attr("x",width/2)
        .attr("y",padding)
        .text("Cellular subscribers according to literacy rate")
        .style("text-anchor","middle")
        .attr("font-family","Arial")
        .attr("font-size","1.2em")
        .attr("fill","#444")
        .attr("font-weight","bold");

    
    svg
        .append("g")
        .attr("transform","translate(80,80)")
        .attr("id","legend")
        .selectAll("rect")
        .data(povertyLevelForLegend)
        .enter()
        .append("rect")
        .attr("x",(d,i)=>20*i)
        .attr("y",50)
        .attr("width",20)
        .attr("height",20)
        .attr("fill",d=>legendColorScale(d));

    svg
        .append("g")
        .attr("transform","translate(60,160)")
        .append("text")
        .attr("x",0)
        .attr("y",0)
        .text("Very Low")
        .attr("font-size","0.7em")
        .attr("fill","#444")
        .attr("font-weight","bold");


    svg
        .append("g")
        .attr("transform","translate(180,160)")
        .append("text")
        .attr("x",0)
        .attr("y",0)
        .text("Very High")
        .attr("font-size","0.7em")
        .attr("fill","#444")
        .attr("font-weight","bold");


    svg
        .append("g")
        .attr("transform","translate(60,120)")
        .append("text")
        .attr("x",0)
        .attr("y",0)
        .text("Poverty Level Color Scale")
        .attr("font-family","Arial")
        .attr("font-size","0.8em")
        .attr("fill","#444")
        .attr("font-weight","bold");

    function showTooltip(d){
        tooltip
            .style("opacity",1)
            .style("left",d3.event.x-(tooltip.node().offsetWidth/2)+"px")
            .style("top",d3.event.y+25+"px")
            .html(`<h4>${d.region}</h4>
                    <ul>
                        <li>Subscribers per 100: <strong>${d.subscribersPer100}</strong></li>
                        <li>Adult Literacy Rate: <strong>${d.adultLiteracyRate}%</strong></li>
                        <li>Growth Rate: <strong>${d.growthRate}%</strong></li>
                        <li>Urban Population Rate: <strong>${d.urbanPopulationRate}%</strong></li>
                        <li>Extreme Poverty Rate: <strong>${d.extremePovertyRate}%</strong></li>
                        <li>Median Age: <strong>${d.medianAge} yrs old</strong></li>
                    </ul>`)
    }

    function hideTooltip(){
        tooltip.style("opacity",0);
    }
        



