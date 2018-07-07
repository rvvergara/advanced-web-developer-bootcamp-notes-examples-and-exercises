d3.json("./sample_geo.json",(err,data)=>{
    let path =  d3.geoPath(),
    width   =   600, height =   600;

    d3.select("svg")
        .attr("width",width)
        .attr("height",height)
      .selectAll("path")
        .data(data.features)
      .enter()  
         .append("path")
         .attr("d",path)
         .attr("fill",d=>d.properties.color);

})