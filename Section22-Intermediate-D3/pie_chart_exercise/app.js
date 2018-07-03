let width   =   500,
    height  =   500,
    minYr   =   d3.min(birthData,d=>d.year),
    maxYr   =   d3.max(birthData,d=>d.year),
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
                    .classed("qtrChart",true)

generatePie(+input.property("value"));

input.on("input",()=>generatePie(+input.property("value")));

function generatePie(year){
    let yrData      = birthData.filter(d=>d.year === year),
        qtrData     = dataByQtrs(yrData),
        monthArcs   = d3.pie()
                        .value(d=>d.births)
                        .sort((a,b)=>months.indexOf(a.month)-months.indexOf(b.month))(yrData),
        qtrArcs     = d3.pie()
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
             .attr("fill",d=>monthColors(d.data.month));

        qtrUpdate
            .enter()
            .append("path")
            .classed("qtrArc",true)
          .merge(qtrUpdate)
            .attr("d",qtrPath)
            .attr("fill",(d,i)=>qtrColors(i+1));            
}

function dataByQtrs(yrData){
    let birthsData = [0,0,0,0];
    for(let i=0;i<4;i++){
        yrData.forEach(el=>{
            qtrs[i].includes(el.month)?birthsData[i]+=el.births:birthsData[i]+=0;
        })
    }
    return birthsData;
}