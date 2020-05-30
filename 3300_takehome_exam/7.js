const mercator_width = 500-50;
const mercator_height = 500-50;
const map = d3.select("#map");

let data = d3.json("europe.topojson").then(function(data) {

let europe = topojson.feature(data, data.objects.europe);
let projection = d3.geoMercator()
  .fitSize([mercator_width, mercator_height],europe);
let path = d3.geoPath().projection(projection);

let pisa_max = d3.max(europe.features,d=>d.properties.pisa);
let pisa_min = d3.min(europe.features,d=>d.properties.pisa);
let pisascale = d3.scaleSequential([pisa_min,pisa_max],d3.interpolateViridis);

map.append("path")
  .attr( "d", path(d3.geoGraticule10()));
map.selectAll("path").data(europe.features)
  .enter()
  .append("path")
  .attr("fill", d=>pisascale(d.properties.pisa))
  .attr("d", path)
  .on("mouseover",function(d){
    d3.select(this)
    .attr("stroke","black");
    d3.select("#hint")
      .text(d.properties.pisa)
      .attr("fill","black")
  })
  .on("mouseout", function(){
      d3.select(this)
        .attr("stroke","none")
  });
});
