document.addEventListener("DOMContentLoaded",()=>{
    let     minYr   =   d3.min(birthData,d=>d.year),
            maxYr   =   d3.max(birthData,d=>d.year),
            maxBirths   =   d3.max(birthData,d=>d.births),
            width   =   800,
            height  =   600,
            barPadding  = 10,
            barWidth    =   width/12 - barPadding,
            yScale      =   d3.scaleLinear().domain([maxBirths,0]).range([0,height]),

            svg         =   d3.select("svg")
                                .attr("width",width)
                                .attr("height",height)
                                .style("border","1px solid black"),

            input       =   d3.select("input")
                                  .attr("min",minYr)
                                  .attr("max",maxYr)
                                  .attr("value",minYr);   

    buildRects(makeSelection(minYr));    

    function makeSelection(yearFilter,keyFn){
        return svg
                .selectAll("rect")
                .data(birthData.filter(d=>d.year===yearFilter),keyFn)          
    }

    input.on("input",()=>{
      let yr = +d3.event.target.value;
      let updateSelect = svg
        .selectAll("rect")
        .data(birthData.filter(d=>d.year===yr),d=>d.year);

      buildRects(makeSelection(yr,d=>d.year)); //to match items based on year since we want data to change every change in year
    });

    function buildRects(selection){
        selection
        .exit()
        .remove();

        selection  
            .enter()
            .append("rect")
            .attr("x",(d,i)=>(barPadding+barWidth)*i)
            .attr("y",d=>yScale(d.births))
            .attr("width",barWidth)
            .attr("height",d=>height-yScale(d.births))
            .attr("fill","purple");
    }
});
