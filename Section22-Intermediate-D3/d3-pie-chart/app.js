let minYear     = d3.min(birthData, d => d.year),
    maxYr       = d3.max(birthData,d=>d.year),
    width       = 600,
    height      = 600,
    yearData    = birthData.filter(d => d.year === minYear),
    continents  =   Array.from(new Set(birthData.map(dat=>dat.continent))),
    colorScale  =   d3.scaleOrdinal()
                        .domain(continents)
                        .range(d3.schemeCategory10),
    chart       =   d3.select("svg")
                        .attr("width",width)
                        .attr("height",height)
                        .append("g")
                        .classed("chart",true)
                        .attr("transform",`translate(${width/2},${height/2})`),                                           
    input       =   d3.select("input")
                        .attr("min",minYear)
                        .attr("max",maxYr)
                        .attr("value",minYear);

generatePie(+input.property("value"));

input.on("input",()=>generatePie(+d3.event.target.value))

function generatePie(yr){ 
    let arcs        =   d3.pie()
                            .value(d=>d.births)
                            .sort((a,b)=>{
                                if(a.continent<b.continent) return -1
                                else if(a.continent>b.continent) return 1
                                else return a.births - b.births;
                            })
                            (birthData.filter(d=>d.year === yr)),
        path        =   d3.arc()
                            .outerRadius(width/2-10)
                            .innerRadius(width/4),
    updateSelect    = chart
                        .selectAll(".arc")
                            .data(arcs);
    updateSelect
        .exit()
        .remove();

    updateSelect
            .enter()
        .append("path")
            .classed("arc",true)
        .merge(updateSelect)
            .attr("d",path)
            .attr("fill",d=>colorScale(d.data.continent))
            .attr("stroke","black"); 
}

    
