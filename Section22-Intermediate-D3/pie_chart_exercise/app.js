let width   =   500,
    height  =   500,
    minYr   =   d3.min(birthData,d=>d.year),
    maxYr   =   d3.max(birthData,d=>d.year),
    tooltip =   d3.select("body").append("div").classed("tooltip",true),
    months  =   Array.from(new Set(birthData.map(d=>d.month))),
    qtrs  =   [["January","February","March"],["April","May","June"],["July","August","September"],["October","November","December"]],
    monthColors  =   d3.scaleOrdinal()
                    .domain(months)
                    .range(d3.schemeCategory20),
    qtrColors   =    d3.scaleOrdinal()
                    .domain([1,2,3,4])
                    .range(d3.schemeCategory10),
    input   =   d3.select("input")
                    .attr("min",minYr)
                    .attr("max",maxYr)
                    .attr("value",minYr),
    svg   =   d3.select("svg")
                    .attr("width",width)
                    .attr("height",height),
    monthChart =  svg    
                    .append("g")
                    .attr("transform",`translate(${width/2},${height/2})`)
                    .classed("monthChart",true),
    qtrChart  =   svg    
                    .append("g")
                    .attr("transform",`translate(${width/2},${height/2})`)
                    .classed("qtrChart",true);

generatePie(+input.property("value"));

input.on("input",()=>generatePie(+input.property("value")));

function generatePie(year){
    let yrData      = birthData.filter(d=>d.year === year),
        qtrData     = dataByQtrs(yrData),
        monthArcs   = d3.pie()
                        .value(d=>d.births)
                        .sort((a,b)=>months.indexOf(a.month)-months.indexOf(b.month))(yrData),
        qtrArcs     = d3.pie()
                        .value(d=>d.births)
                        .sort((a,b)=>qtrData.indexOf(a)-qtrData.indexOf(b))(qtrData),    
        monthPath    = d3.arc()
                        .outerRadius(width/2 - 40)
                        .innerRadius(width/4),
        qtrPath     =  d3.arc()
                         .outerRadius(width/4)
                         .innerRadius(0),

        monthUpdate    = monthChart.selectAll(".monthArc")
                                 .data(monthArcs),

        qtrUpdate      = qtrChart.selectAll(".qtrArc")
                                .data(qtrArcs);

        d3.select("h1").text(`Births by months and quarter for ${input.property("value")}`);

        monthUpdate
            .exit()
            .remove();

        qtrUpdate
            .exit()
            .remove();

        monthUpdate
            .enter()
            .append("path")
            .classed("monthArc",true)
           .merge(monthUpdate)
             .attr("d",monthPath)
             .attr("fill",d=>monthColors(d.data.month))
             .on("mousemove",d=>showTooltip(d))
             .on("touchstart",d=>showTooltip(d))
             .on("mouseout",d=>hideTooltip())
             .on("touchend",d=>hideTooltip())

        qtrUpdate
            .enter()
            .append("path")
            .classed("qtrArc",true)
          .merge(qtrUpdate)
            .attr("d",qtrPath)
            .attr("fill",(d,i)=>qtrColors(i+1))
            .on("mousemove",qtrArcs=>qtrTooltip(qtrArcs))   
            .on("touchstart",qtrArcs=>qtrTooltip(qtrArcs))
            .on("mouseout",d=>hideTooltip())
            .on("touchend",d=>hideTooltip())   
}

function dataByQtrs(yrData){
    let birthsData = [1,2,3,4].map(el=>{
        let obj = {};
        obj.quarter = el;
        obj.births = 0;    
        return obj;
    });
    for(let i=0;i<4;i++){
        yrData.forEach(el=>{
            qtrs[i].includes(el.month)?birthsData[i].births+=el.births:birthsData[i].births+=0;
            birthsData[i].year = el.year;
        })
    }
    return birthsData;
}

function showTooltip(d){
    tooltip
        .style("opacity",1)
        .style("left",d3.event.x-(tooltip.node().offsetWidth/2)+"px")
        .style("top",d3.event.y+25+"px")
        .html(`<h4>${d.data.month} ${d.data.year}<h4>
                <h5>${d.data.births.toLocaleString()} births</h5>`)
}

function qtrTooltip(d){
    tooltip
        .style("opacity",1)
        .style("left",d3.event.x-(tooltip.node().offsetWidth/2)+"px")
        .style("top",d3.event.y+25+"px")
        .html(`<h3>Q${d.data.quarter} ${d.data.year}</h3>
                <h4>${d.data.births.toLocaleString( )} births</h4>`)
}

function hideTooltip(){
    tooltip.style("opacity",0);
}