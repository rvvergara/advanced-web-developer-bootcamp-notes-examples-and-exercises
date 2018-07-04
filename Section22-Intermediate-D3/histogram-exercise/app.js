document.addEventListener("DOMContentLoaded",()=>{
    let width = 800, height = 600, padding = 50, barPadding = 1,
    usableData = regionData.filter(d=>d.medianAge !== null),
    disp    =   d3.select("p"),
    input   =   d3.select("input"),
    tooltip =   d3.select("body")
                    .append('div')
                    .classed("tooltip",true),
    svg     =   d3.select("svg")
                    .attr("width",width)
                    .attr("height",height);
    
    generateHist(16);
    
    input
        .on("input",()=>{
            generateHist(+input.property("value"));
        });
    
    
    function generateHist(binLength){
       let  xScale  =   d3.scaleLinear().domain(d3.extent(usableData,d=>d.medianAge)).rangeRound([padding,width-padding]),
            hist    =   d3.histogram()
                            .domain(xScale.domain())
                            .thresholds(xScale.ticks(binLength))
                            .value(d=>d.medianAge);
            bins    =   hist(usableData),
            yScale = d3.scaleLinear().domain([0,d3.max(bins,d=>d.length)]).range([height-padding,padding]),
    
        disp
            .text(`Number of bins: ${bins.length}`);
        createAxes(binLength,xScale,yScale);
        genUpdatePattern(bins,xScale,yScale);
    }
    
    function genUpdatePattern(bins,xScale,yScale){
        let  updateSelect    =   svg
                                    .selectAll("rect")
                                    .data(bins),

            rectTransition  =   d3.selectAll("rect")
                                    .data(bins)
                                    .transition()
                                    .duration(2000)
                                    .ease(d3.easeLinear)
                                    .delay((d,i)=>i*100)
        updateSelect
            .exit()
            .remove();
    
        updateSelect
            .enter()
            .append("rect")
          .merge(updateSelect) 
            .attr("x",d=>xScale(d.x0))
            .attr("y",d=>yScale(d.length))
            .attr("width",d=>xScale(d.x1) - xScale(d.x0) - barPadding)
            .attr("height",d=>height - yScale(d.length)-padding)
            .attr("fill","purple")
            .attr("stroke","yellow")
            .attr("stroke-width","1px");

        rectTransition
        .attr("y",d=>yScale(d.length))
        .attr("height",d=>height - yScale(d.length)-padding);

        d3.selectAll("rect")
            .on("mousemove",d=>showTooltip(d))
            .on("touchstart",d=>showTooltip(d))
            .on("mouseout",d=>hideToolTip())
            .on("touchend",d=>hideToolTip())
    }
    
    function createAxes(binLength,xScale,yScale){
        svg
        .selectAll("g")
        .remove();
        svg
            .append("g")
            .attr("transform",`translate(0, ${height-padding})`)
            .classed("xAxis",true)
            .call(d3.axisBottom(xScale).ticks(binLength))
            .selectAll("text")
            .attr("transform",d=>{
                return binLength>43? `rotate(-90)`:`rotate(0)`
            })
            .attr("x",d=>{
                if(binLength>43) return -padding/3;
            });
        svg
            .append("g")
            .attr("transform",`translate(${padding},0)`)
            .classed("yAxis",true)
            .call(d3.axisLeft(yScale));
        svg
            .append("g")
            .classed("xAxisLabel",true)
            .attr("transform",`translate(${width/2},${height-5})`)
            .append("text")
            .text("Median Age")
            .attr("text-anchor","middle")
            .attr("font-family","Arial")
            .attr("font-weight","bold");
        svg
            .append("g")
            .classed("yAxisLabel",true)
            .attr("transform",`translate(${padding/3},${height/2})`)
            .append("text")
            .text("Frequency")
            .attr("transform",`rotate(-90)`)
            .attr("text-anchor","middle")
            .attr("font-family","Arial")
            .attr("font-weight","bold");
    }
    function showTooltip(d){
        tooltip
            .style("opacity",1)
            .style("left",d3.event.x-(tooltip.node().offsetWidth/2)+"px")
            .style("top",d3.event.y+25+"px")
            .html(`<p>${d.x0} - ${d.x1} yrs old - <strong>${d.length}</strong></p>`)
    }
    function hideToolTip(){
        tooltip
          .style("opacity",0)
    }
});
