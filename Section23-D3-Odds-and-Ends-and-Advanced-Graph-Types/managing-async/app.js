// write your code here!
d3.queue()
   .defer(d3.json,"./countries.json")
   .defer(d3.csv,"./simplemaps-worldcities-basic.csv",row=>{
    if(+row.pop<10000) return;
    return {
      cityName: row.city,
      countryCode: row.iso2,
      population: +row.pop
    }
  })
  .awaitAll((err,allData)=>{
    if(err) throw error;
    let data = allData[0].geonames.map(country=>{
      country.cities = allData[1].filter(city => city.countryCode === country.countryCode);
      return country;
    });
    let countrySelection = d3.select("body")
                              .selectAll("div")
                              .data(data)
                              .enter()
                              .append("div");

        countrySelection
          .append("ul")
          .html(d=>d.cities.map(city=>{
            let percentage = city.population / d.population*100;
            return `<li>${city.cityName} - ${percentage.toFixed(2)}%</li>`
          }).join(""))
  })

// d3.json("./countries.json",(err,data)=>{
//     if(err) throw error;
//     d3.select("body")
//       .selectAll("h3")
//       .data(data.geonames)
//       .enter()
//       .append("h3")
//       .text(d=>d.countryName);
// });

// d3.csv("./simplemaps-worldcities-basic.csv",row=>{
//   if(+row.pop<10000) return;
//   return {
//     cityName: row.city,
//     countryCode: row.iso2,
//     population: +row.pop
//   }
// },(err,data)=>{
//   if(err) throw error;
//   console.log(data);
// })