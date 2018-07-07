d3.json("./sample_topo.json",(err,data)=>{
  if(err) throw err;
  let path =  d3.geoPath(),
  width   =   600, height =   600;

  d3.select("svg")
      .attr("width",width)
      .attr("height",height)
    .selectAll("path")
      .data(topojson.feature(data,data.objects.collection).features)
    .enter()  
       .append("path")
       .attr("d",path)
       .attr("fill",d=>d.properties.color);
})