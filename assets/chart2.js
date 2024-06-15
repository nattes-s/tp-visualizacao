/*function drawWordCloud(data) {
  var width = 960;
  var height = 500;

  var svg = d3.select("#chart2 svg")
      .attr("width", width)
      .attr("height", height);

  var layout = d3.layout.cloud()
      .size([width, height])
      .words(data.map(function(d) {
          return { text: d.termo, size: +d.frequencia * 10 };
      }))
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw);

  layout.start();

  function draw(words) {
      svg.append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
  }
}

d3.csv("data/termos.csv").then(function(data) {
  // Check if d3.layout.cloud is loaded
  if (typeof d3.layout.cloud === 'function') {
      drawWordCloud(data);
  } else {
      console.error("d3.layout.cloud is not loaded properly.");
  }
});
*/

function drawWordCloud(data) {
  var width = 960;
  var height = 500;

  var svg = d3.select("#chart2 svg")
      .attr("width", width)
      .attr("height", height);

  var layout = d3.layout.cloud()
      .size([width, height])
      .words(data.map(function(d) {
          return { text: d.termo, size: +d.frequencia * 20 };
      }))
      .padding(2.5)
      .rotate(function() { return ~~(Math.random() * 2) * 80; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw);

  layout.start();

  function draw(words) {
      svg.append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
  }
}

d3.csv("data/termos.csv").then(function(data) {
  if (typeof d3.layout.cloud === 'function') {
      drawWordCloud(data);
  } else {
      console.error("d3.layout.cloud is not loaded properly.");
  }
});
