let diamondsData = {
  'carat':[],'count':[]
};
const requestData = async () => {
const height = 120;
const width = 500;
const chart = d3.select("#area")
  .append("g")
  .attr("class","chart");
const axis = d3.select("#area")
  .append("g")
  .attr("class","axis")
    .attr("transform","translate("+ 0 +","+ 100 +")");
const file = await d3.csv("diamond_counts.csv");
file.forEach( (d, i) => {
    diamondsData['carat'].push(Number(d["carat"]));
    diamondsData['count'].push(Number(d["count"]));
});
for (let i = 0; i < 100; i++){
  if(diamondsData.carat[i] == 5){
    delete diamondsData.carat[i]
    delete diamondsData.count[i]
  }
}
const max_carat = d3.max(diamondsData['carat']);
const min_carat = d3.min(diamondsData['carat']);
const max_count = d3.max(diamondsData['count']);
const min_count = d3.min(diamondsData['count']);

const carat_scale = d3.scaleLinear().domain([min_carat,max_carat]).range([10,490])
const count_scale = d3.scaleLinear().domain([min_count,max_count]).range([100,0])

let xAxis = d3.axisBottom(carat_scale);
axis.call(xAxis);

// let area = d3.area()
//   .x(function(d) { return carat_scale(d.carat); })
//   .y0(100)
//   .y1();
//   chart.append("path").datum(diamondsData)
//   .attr("d", diamondsData)
//   .attr("fill", "blue")
//   .attr("stroke","darkblue")
//   .style("stroke-width", 2);

};
requestData();
