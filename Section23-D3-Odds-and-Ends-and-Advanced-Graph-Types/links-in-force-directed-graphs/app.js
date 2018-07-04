var width = 600;
var height = 600;

var nodes = [
  { color: "red", size: 5, },
  { color: "orange", size: 10 },
  { color: "yellow", size: 15 },
  { color: "green", size: 20 },
  { color: "blue", size: 25 },
  { color: "purple", size: 30 }
];

var links = [
  { source: "red", target: "orange"},
  { source: "orange", target: "yellow"},
  { source: "yellow", target: "green"},
  { source: "green", target: "blue"},
  { source: "blue", target: "purple"},
  { source: "purple", target: "red"},
  { source: "green", target: "red"}
];

var svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height);

var nodeSelection = svg
                      .selectAll("circle")
                      .data(nodes)
                      .enter()
                      .append("circle")
                        .attr("r", d => d.size)
                        .attr("fill", d => d.color);

var simulation = d3.forceSimulation(nodes);

simulation
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("nodes", d3.forceManyBody())
  .on('tick', ticked);
         
function ticked() {
  nodeSelection
    .attr("cx", d => d.x )
    .attr("cy", d => d.y );
}