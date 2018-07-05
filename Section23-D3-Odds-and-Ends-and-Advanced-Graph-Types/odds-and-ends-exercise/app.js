let notIncluded = [
    "Arab World",
    "Caribbean small states",
    "Central Europe and the Baltics",
    "East Asia & Pacific (excluding high income)",
    "Early-demographic dividend",
    "East Asia & Pacific",
    "East Asia & Pacific (IDA & IBRD countries)",
    "Europe & Central Asia (IDA & IBRD countries)",
    "Euro area",
    "Europe & Central Asia (excluding high income)",
    "Europe & Central Asia",
    "Fragile and conflict affected situations",
    "High income",
    "Heavily indebted poor countries (HIPC)",
    "IBRD only",
    "IDA & IBRD total",
    "IDA total",
    "IDA blend",
    "IDA only",
    "Not classified",
    "Latin America & Caribbean (excluding high income)",
    "Latin America & Caribbean",
    "Least developed countries: UN classification",
    "Low income",
    "Lower middle income",
    "Low & middle income",
    "Late-demographic dividend",
    "Latin America & the Caribbean (IDA & IBRD countries)",
    "Middle East & North Africa (IDA & IBRD countries)",
    "Middle East & North Africa",
    "Middle East & North Africa (excluding high income)",
    "Middle income",
    "OECD members",
    "Other small states",
    "Pre-demographic dividend",
    "Pacific island small states",
    "West Bank and Gaza",
    "Post-demographic dividend",
    "Sub-Saharan Africa",
    "Sub-Saharan Africa (excluding high income)",
    "Small states",
    "South Asia",
    "South Asia (IDA & IBRD)",
    "Sub-Saharan Africa (IDA & IBRD countries)",
    "Upper middle income",
    "World"
];

d3.queue()
    .defer(d3.csv,"./data/population/API_SP.POP.TOTL_DS2_en_csv_v2_9984924.csv",row=>{
        if(!notIncluded.includes(row["Country Name"])){
            let popObj = {
                country: row["Country Name"],
            }
            for(let i=1960;i<2018;i++){
                popObj[i] = row[i]
            }
            return popObj;
        }
    })
    .defer(d3.csv,"./data/urban-population/API_SP.URB.TOTL_DS2_en_csv_v2_9986602.csv",row=>{
        if(!notIncluded.includes(row["Country Name"])){
            let urbanpop = {
                country: row["Country Name"],
            }
            for(let i=1960;i<2018;i++){
                urbanpop[i] = row[i]
            }
            return urbanpop;
        }
    })
    .defer(d3.csv,"./data/gdptot/API_NY.GDP.MKTP.CD_DS2_en_csv_v2_9984786.csv",row=>{
        if(!notIncluded.includes(row["Country Name"])){
            let countObj = {
                country: row["Country Name"],
                indicator: row["Indicator Name"],
            }
            for(let i=1960;i<2018;i++){
                 countObj[i] = row[i]
            }
            return countObj;
        }
    })
    .defer(d3.csv,"./data/gdpcap/API_NY.GDP.PCAP.CD_DS2_en_csv_v2_9984832.csv",row=>{
        if(!notIncluded.includes(row["Country Name"])){
            let gdpObj = {
                country: row["Country Name"],
                indicator: row["Indicator Name"],
            }
            for(let i=1960;i<2018;i++){
                 gdpObj[i] = row[i]
            }
            return gdpObj;
        }
    })
    .awaitAll((err,data)=>{
        let dataArr = [];
            
        if(err) throw error;
        // 1. Create an array separating each country
        for(let i=0;i<data[0].length;i++){
            let countryName = data[0][i].country;
            dataArr.push({
                country: countryName,
                data: []
            })
        }
        // 2. Each country's object should have a data array, each element in dis array is a data of year, population, gdp, urban population
        for(let i=0;i<dataArr.length;i++){
            for(let a=1960;a<2018;a++){
                dataArr[i].data.push({
                    year: a,
                    country: data[0][i]["country"],
                    total_population: data[0][i][a],
                    urban_population: data[1][i][a],
                    gdp: data[2][i][a],
                    per_capita: data[3][i][a]
                })
            }
        }
        let gdpArr = [],
            countries = [],
            yrs    = [];
        for(let i=0;i<dataArr.length;i++){
            dataArr[i].data.forEach(n=>{
               if(n.gdp!=="") gdpArr.push(+n.gdp)
            })
        }
        for(let el of dataArr[0].data){
            yrs.push(el.year)
        }
        for(let el of dataArr){
            countries.push(el.country);
        }
        /*
        Visualization proper
        */
       let width = 800,
           height = 600,
           padding = 50,
           barPadding = 5,
           barWidth = (width-2*padding)/yrs.length - barPadding,
           xScale = d3.scaleLinear().domain(d3.extent(yrs)).range([padding,width-padding]),
           xAxis = d3.axisBottom(xScale).tickSize(-height+padding).tickSizeOuter(0),
           select = d3.select("select"),        
           tooltip = d3.select(".tooltip"),
           selectNode = select.node(),
           svg  = d3.select("svg")
                      .attr("width",width)
                      .attr("height",height);
        select
            .selectAll("options")
            .data(countries.sort())
            .enter()
            .append("option")
            .attr("value",d=>d)
            .text(d=>d);


        let selectedValue = selectNode.options[selectNode.selectedIndex].value,
            
        countryData = dataArr.filter(d=>d.country === selectedValue)[0].data,

        updateSelect = svg
                            .selectAll("rect")
                            .data(countryData);

let  yScale = d3.scaleLinear().domain([0,d3.max(countryData,d=>d.gdp)]).range([height,0]),

yAxis = d3.axisLeft(yScale).tickSize(-width+2*padding).tickSizeOuter(0);

svg
.append("g")
.classed("yAxis",true)
.attr("transform",`translate(${padding},${-padding})`)
.call(yAxis)
.selectAll("text")
.text(d=>(d/1e9).toLocaleString());

svg
.append("g")
.classed("xAxis",true)
.attr("transform",`translate(0,${height-padding})`)
.call(xAxis)
.selectAll("text")
.text(d=>d.toString())
.attr("dy","1.2em");




displayCountry(selectedValue,svg,width,height);

updateSelect
    .enter()
    .append("rect")
    .attr("x",(d,i)=>(barPadding+barWidth)*i+padding)
    .attr("y",d=>yScale(d.gdp)-padding)
    .attr("width",barWidth)
    .attr("height",d=>{
        if(d.gdp === "") return 0;
        return height - yScale(d.gdp)})
    .attr("fill","purple");

select.on("change",()=>{
    selectedValue = selectNode.options[selectNode.selectedIndex].value;
    countryData = dataArr.filter(d=>d.country === selectedValue)[0].data;
    displayCountry(selectedValue,svg,width,height);

    yScale = d3.scaleLinear().domain([0,d3.max(countryData,d=>d.gdp)]).range([height,0]),

    yAxis = d3.axisLeft(yScale).tickSize(-width+2*padding).tickSizeOuter(0);
  
    d3.select(".yAxis").remove();
    
    svg
    .append("g")
    .classed("yAxis",true)
    .attr("transform",`translate(${padding},${-padding})`)
    .call(yAxis)
    .selectAll("text")
    .text(d=>(d/1e9).toLocaleString());
    





    d3.selectAll("rect")
        .data(countryData)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .delay((d,i)=>50*i)
        .on("start",(d,i)=>{
            if(i===0) d3.select(".title")
            .text("Updating to data for "+selectedValue)
        })
        .on("end",(d,i,nodes)=>{
            if(i===nodes.length-1){
                d3.select(".title")
                .text("GDP per yr in "+selectedValue)
            }
        })
        .attr("y",d=>yScale(d.gdp)-padding)
        .attr("height",d=>{
            if(d.gdp === "") return 0;
            return height - yScale(d.gdp)});

        d3.selectAll("rect")
            .on("mousemove",d=>showTooltip(d,tooltip))
            .on("touchenter",d=>showTooltip(d,tooltip))
            .on("mouseout",d=>hideTooltip(tooltip))
            .on("touchend",d=>hideTooltip(tooltip))
    })
});

    function showTooltip(d,tooltip){
        tooltip
            .style("opacity",1)
            .style("opacity",1)
            .style("left",d3.event.x-tooltip.node().offsetWidth/2+"px")
            .style("top",d3.event.y+25+"px")
            .html(`<h4>${d.year} - GDP: $${(d.gdp/1e12).toFixed(2).toLocaleString()} Trillion/${(d.per_capita/1000).toFixed(2).toLocaleLowerCase()}K per capita</h4>`)
    }

    function hideTooltip(tooltip){
        tooltip
          .style("opacity",0);
      }

    function displayCountry(country,svg,width,height){
    svg
    .selectAll(".display")
    .remove()

  svg.append("g")
       .classed("display",true)
       .attr("transform",`translate(${width/2},${height/25})`)
       .append("text")
       .classed("title",true)
       .text("GDP per yr in "+country)
       .attr("text-anchor","middle")
       .attr("font-size","1.5em")
       .attr("font-family","Arial")
       .attr("font-weight","bold");
    }