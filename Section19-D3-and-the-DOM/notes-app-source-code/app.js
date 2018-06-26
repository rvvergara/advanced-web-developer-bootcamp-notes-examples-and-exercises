let input = d3.select("input"),
    preview = d3.select(".preview");

d3.select("#new-note")
    .on('submit', function() {
      d3.event.preventDefault();
      d3.select("#notes")
        .append('p')
          .classed('note', true)
          .text(input.property('value'));
      input.property('value', '');
      setPrev("");
    })

  d3.select("#remove")
  .on("click",()=>{
    d3.selectAll(".note")
        .remove();
  })

d3.select("#lucky")
    .on('click',()=>animateBackgroundAndFont());

input.on("input",()=>{
  let val = d3.event.target.value;
  setPrev(val);
})
  
let animateBackgroundAndFont = ()=>{
  d3.selectAll(".note")
      .style("background-color",changeBackground)
      .style("font-size",changeFontSize);
}

changeBackground = () => {
  ([r,g,b] = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]);
  return `rgb(${r},${g},${b})`;
}

let changeFontSize = ()=>{
  return `${(Math.floor(Math.random()*40))}px`;
}

let setPrev = (val) => {
  preview
  .classed("invisible",val ==="")
  .text(val);  
}
  