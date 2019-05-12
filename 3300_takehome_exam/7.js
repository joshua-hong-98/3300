let data = d3.json("europe.topojson").then(function(data) {
const mercator_width = 500 - 50;
const mercator_height = 120 - 25;
const map = d3.select("#map");
let europe = topojson.feature(data, data.objects.europe);
let europeMesh = topojson.mesh(data, data.objects.europe);
let projection = d3.geoMercator()
  .fitSize([mercator_width, mercator_height],europe);
let path = d3.geoPath().projection(projection);
map.append("path")
  .attr( "d", path(d3.geoGraticule10()));
mercator_svg.selectAll("path").data(countries.features)
  .enter()
  .append("path")
  .attr("class","country")
  .attr("d", path);
mercator_svg.append("path")
  .datum(countriesMesh)
  .attr("class","outline")
  .attr("d", path);

});
