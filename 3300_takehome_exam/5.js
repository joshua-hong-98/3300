const height = 120;
const width = 500;
const chart = d3.select("#area")
  .append("g")
  .attr("class","chart");
const axis = d3.select("#area")
  .append("g")
  .attr("class","axis")
  .attr("transform","translate("+ 0 +","+ 100 +")");
  
d3.csv("diamond_counts.csv").then(function(diamond_data) {
file = diamond_data.filter( d => d['count'] != "HANDLE_THIS_MISSING_VALUE_BY_DELETING_THIS_ENTIRE_ROW!");
file.forEach( (d, i) => {
    d['carat'] = Number(d["carat"]);
    d['count'] = Number(d["count"]);
});

let num_count = []
let num_carat = []
for (var i = 0; i < 60; i++){
  num_count.push(file[i]['count'])
  num_carat.push(file[i]['carat'])
};

const max_carat = d3.max(num_carat);
const min_carat = d3.min(num_carat);
const max_count = d3.max(num_count);
const min_count = d3.min(num_count);


const carat_scale = d3.scaleLinear().domain([min_carat,max_carat]).range([10,490])
const count_scale = d3.scaleLinear().domain([min_count,max_count]).range([100,0])

let xAxis = d3.axisBottom(carat_scale);
axis.call(xAxis);

let area = d3.area()
  .x(function(d) {return carat_scale(d.carat)})
  .y0(100)
  .y1(function(d) {return count_scale(d.count)});
  chart.append("path").datum(file)
  .attr("d", area)
  .attr("fill", "blue")
  .attr("stroke","darkblue")
  .style("stroke-width", 2);

});
