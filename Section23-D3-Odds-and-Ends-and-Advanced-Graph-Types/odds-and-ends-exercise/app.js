d3.queue()
.defer(d3.csv,"./data/population/API_SP.POP.TOTL_DS2_en_csv_v2_9984924.csv",sanitizeData)
.defer(d3.csv,"./data/urban-population/API_SP.URB.TOTL_DS2_en_csv_v2_9986602.csv",sanitizeData)
.defer(d3.csv,"./data/gdptot/API_NY.GDP.MKTP.CD_DS2_en_csv_v2_9984786.csv",sanitizeData)
.defer(d3.csv,"./data/gdpcap/API_NY.GDP.PCAP.CD_DS2_en_csv_v2_9984832.csv",sanitizeData)
.awaitAll((err,data)=>{
    if(err) throw err;
    
    // 1. Set dataset variable names for easier reference:
        let data0Processed = data[0],
        data1Processed = data[1],
        data2Processed = data[2],
        data3Processed = data[3],
    // 2. Create integrated data array:
        period = d3.extent(yearsArray(data0Processed[0])),
        usableData = generateUsableData(data0Processed,data1Processed,data2Processed,data3Processed,period);
    // 3. Visualization proper
    let width = 800, height = 600, padding = 90, barPadding = 5,

        svg =   d3.select("svg")
                   .attr("width",width)
                   .attr("height",height)
                   .style("border","1px solid black"),

        select  =  d3.select("select");

        select
            .selectAll("option")
            .data(countries(usableData))
            .enter()
            .append("option")
            .attr("value",d=>d)
            .text(d=>d)
            .node();  

    // Assign data to selected option in select box:
    let selectedIndex = select.node().options.selectedIndex,
        selectedCountry = select.node()[selectedIndex].value,
        countryData = selectionData(usableData,selectedCountry),
        gdpMax = d3.max(countryData,d=>+d.gdp_total),
        barwidth    = (width-2*padding)/countryData.length - barPadding,
        yScale = d3.scaleLinear().domain([0,gdpMax]).range([height-2*padding,padding]),

        updateSelect = svg
                        .selectAll("rect")
                          .data(countryData);
        
    // Create axes
    createAxes(data0Processed[0],yScale);

    let enterSelect = updateSelect
                        .enter()
                        .append("rect");

    rectangleDims(enterSelect);

    d3.selectAll("rect")
        .on("mousemove",d=>showTooltip(d))
        .on("touchstart",d=>showTooltip(d))
        .on("mouseout",d=>hideTooltip(d))
        .on("touchend",d=>hideTooltip(d));

    displayCountry(selectedCountry);
         
    select.on("change",()=>{
        selectedIndex = select.node().options.selectedIndex,
        selectedCountry = select.node()[selectedIndex].value,
        countryData = selectionData(usableData,selectedCountry),
        gdpMax = d3.max(countryData,d=>+d.gdp_total),
        barwidth    = (width-2*padding)/countryData.length - barPadding,
        yScale = d3.scaleLinear().domain([0,gdpMax]).range([height-2*padding,padding]);

    d3.select(".yAxis")
        .transition()
        .duration(2000)
        .call(d3.axisLeft(yScale).tickSize(-width+2*padding)
        .tickSizeOuter(0))
        .selectAll("text")
        .text(d=>(d/1e6).toLocaleString());

    let rects = d3.selectAll("rect")
       .data(countryData)
         .transition()
         .duration(2000)
         .delay((d,i)=>50*i)
         .on("start",(d,i)=>{
             if(i===0){
                 d3.select(".title")
                    .text("Fetching data for "+selectedCountry+"...")
             }
         })
         .on("end",(d,i,nodes)=>{
             if(i===nodes.length-1){
                 d3.select(".title")
                     .text("Yearly GDP data in "+selectedCountry)
             }
         });
         rectangleDims(rects);
    });

    /*
    HELPER FUNCTIONS
    */
    // Function to process data/remove countries w/o key indicator values
    function processData(unprocessed){
        let dataProcessed = [];
        for(el of unprocessed){
            let formatted = {};
            for(let key in el){
                if(el[key].length!==0) formatted[key] = el[key];
            }
            dataProcessed.push(formatted);
        }
        return dataProcessed;
    }
    
    // Function to get years in the data:
    function yearsArray(datasource){
        let years = [];
        for(let key in datasource){
            if(isFinite(key)) years.push(+key);
        };
        return years;
    }

    // Function to create countries list:
    function countries(datasource){
        return datasource.map(country => country.countryName).sort();
    }

    // Function to integrate all data to be used in visualization
    function generateUsableData(){
        let integratedData = [],
            minYr = d3.min(arguments[4]),
            maxYr = d3.max(arguments[4]);

        for(let country of arguments[0]){
            integratedData.push({
                countryName: country.countryName,
                data: []
            });
        }
        for(let i=0;i<integratedData.length;i++){
            for(let a=minYr;a<=maxYr;a++){
                if(arguments[0][i][a]!==undefined&&arguments[1][i][a]!==undefined&&arguments[2][i][a]!==undefined&&arguments[3][i][a]!==undefined){
                    integratedData[i].data.push({
                        year: a,
                        countryName: integratedData[i].countryName,
                        population_total: arguments[0][i][a],
                        urban_population: arguments[1][i][a],
                        gdp_total: arguments[2][i][a],
                        gdp_per_cap: arguments[3][i][a]
                    })                    
                }
            }
        }
        return integratedData;
    }

    // Function to select data of selected country
    function selectionData(datasource,selectParam){
        return datasource.filter(d=>d.countryName === selectParam)[0].data;
    }

    //Function to create x and y axes
    function createAxes(data0,yScale){
        let xScale = d3.scaleLinear().domain(d3.extent(yearsArray(data0))).rangeRound([padding,width-padding]),
            xAxis  = d3.axisBottom(xScale).ticks().tickSize(-height+3*padding).tickSizeOuter(0),
            yAxis  = d3.axisLeft(yScale).tickSize(-width+2*padding).tickSizeOuter(0);

        svg
            .append("g")
            .classed("xAxis",true)
            .attr("transform",`translate(${padding/3},${height-1.5*padding})`)
            .call(xAxis)
            .selectAll("text")
            .text(d=>d.toString());
        svg
            .append("g")
            .classed("yAxis",true)
            .attr("transform",`translate(${4*padding/3},${padding/2})`)
            .call(yAxis)
            .selectAll("text")
            .text(d=>(d/1e6).toLocaleString());
        svg
            .append("g")
            .classed("yAxisLabel",true)
            .attr("transform",`translate(${padding/3},${height/2})`)
            .append("text")
            .text("GDP ($Million)")
            .attr("transform",`rotate(-90)`)
            .attr("text-anchor","middle")
            .attr("font-family","Arial")
            .attr("font-weight","bold");
    }

    // Function to set attributes of rectangles
    function rectangleDims(selection){
        selection
            .attr("x",(d,i)=>(barPadding+barwidth)*i+4*padding/3)
            .attr("width",barwidth)
            .attr("y",d=>yScale(d.gdp_total)+padding/2)
            .attr("height",d=>height-yScale(d.gdp_total)-2*padding)
            .attr("fill","purple");
    }

    // Function to display country
    function displayCountry(country){
        svg
          .selectAll(".display")
          .remove()
      
        svg.append("g")
             .classed("display",true)
             .attr("transform",`translate(${(width-2*padding)/2-padding},${height/10})`)
             .append("text")
             .classed("title",true)
             .text("Yearly GDP Data for "+country)
             .attr("font-size","1.5em")
             .attr("font-family","Arial")
             .attr("font-weight","bold");

        svg.append("g")
             .attr("transform",`translate(${(width-2*padding)/2-padding},${height-padding/2})`)
             .append("text")
             .classed("title",true)
             .text("Data Courtesy of the World Bank https://data.worldbank.org/ ")
             .attr("font-size",".7em")
             .attr("font-family","Arial")
             .attr("font-weight","bold");
      }

    // Functions to show and hide tooltip
    function showTooltip(d){
        let tooltip = d3.select(".tooltip");
        tooltip
            .style("opacity",1)
            .style("left",d3.event.x-(tooltip.node().offsetWidth/2)+"px")
            .style("top",d3.event.y+25+"px")
            .html(`<h4>${d.year}</h4>
                    <ul>
                        <li><strong>Population:</strong> ${(d.population_total/1e6).toFixed(2)}M</li>
                        <li><strong>Urban population:</strong> ${(d.urban_population/d.population_total*100).toFixed(2)}%</li>
                        <li><strong>GDP per capita: $</strong>${(Math.round(+d.gdp_per_cap*100)/100).toLocaleString()}</li>
                        <li><strong>GDP total: $</strong>${(Math.round(+d.gdp_total*100/1e9)/100).toLocaleString()} B</li>
                    </ul>`)
    }

    function hideTooltip(){
        d3.select(".tooltip").style("opacity",0);
    }
});

function sanitizeData(row){
    if(!invalidCountries.includes(row["Country Name"])){
        let obj = {
            countryName: row["Country Name"],
            indicatorName: row["Indicator Name"],
        }
        for(key in row){
            if(isFinite(key) && key!=="") obj[key] = row[key]
        }
        return obj;
    }
}

let invalidCountries = [
    "Arab World",
    "British Virgin Islands",
    "Caribbean small states",
    "Central Europe and the Baltics",
    "Curacao",
    "East Asia & Pacific (excluding high income)",
    "Early-demographic dividend",
    "East Asia & Pacific",
    "East Asia & Pacific (IDA & IBRD countries)",
    "Europe & Central Asia (IDA & IBRD countries)",
    "Euro area",
    "Europe & Central Asia (excluding high income)",
    "Europe & Central Asia",
    "Fragile and conflict affected situations",
    "Gibraltar",
    "High income",
    "Heavily indebted poor countries (HIPC)",
    "IBRD only",
    "IDA & IBRD total",
    "IDA total",
    "IDA blend",
    "IDA only",
    "Not classified",
    "Korea, Dem. People’s Rep.",
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
    "St. Martin (French part)",
    "Sint Maarten (Dutch part)",
    "West Bank and Gaza",
    "Post-demographic dividend",
    "Sub-Saharan Africa",
    "Sub-Saharan Africa (excluding high income)",
    "Small states",
    "South Asia",
    "South Asia (IDA & IBRD)",
    "Sub-Saharan Africa (IDA & IBRD countries)",
    "Turks and Caicos Islands",
    "Upper middle income",
    "World"
];

