let width = 600, height = 600, barPadding = 1, padding = 20,
    minYr = d3.min(birthData,d=>d.year),
    maxYr = d3.max(birthData,d=>d.year),
    input = d3.select("input")
               .attr("max",maxYr)
               .attr("min",minYr)
               .attr("value",minYr);

generateHist(minYr);

input   
   .on("input",()=>{
       let yr = +d3.event.target.value;
       generateHist(yr);
   });

   function generateHist(year){
       let  yrData  = birthData.filter(d=>d.year === year),
            xScale  = d3.scaleLinear().domain([0,d3.max(yrData,d=>d.births)]).range([padding,width-padding]),
            hist    = d3.histogram()
                        .domain(xScale.domain())
                        .thresholds(xScale.ticks())
                        .value(d=>d.births),
            bins    = hist(yrData),
            yScale = d3.scaleLinear().domain([0,d3.max(bins,d=>d.length)]).range([height,0]),
            updateSelect = d3.select("svg")
            .attr("width",width)
            .attr("height",height)
            .selectAll(".bars")
            .data(bins,d=>d.year),

            bars = updateSelect
            .enter()
            .append("g")
            .classed("bars",true);

            bars.append("rect");
            bars.append("text");

        updateSelect
            .exit()
            .remove();

            bars
            .merge(updateSelect)
            .select("rect")
            .attr("x",d=>xScale(d.x0))
            .attr("y",d=>yScale(d.length))
            .attr("width",d=>{
               let w = xScale(d.x1) - xScale(d.x0) - barPadding;
               return w<0?0:w;
            })
            .attr("height",d=>height - yScale(d.length))
            .attr("fill","purple")
            .attr("stroke","yellow")
            .attr("stroke-width","1px");
                
            bars.merge(updateSelect)
                .select("text")
                .text(d=>{
                    if(d.length!==0) return `${d.x0} - ${d.x1}, bin length: ${d.length}`
                    })
                .attr("transform","rotate(-90)")
                .attr("x",d=>10-height)
                .attr("y",d=>(xScale(d.x0)+xScale(d.x1))/2)
                .attr("alignment-baseline","middle");
   }

    

