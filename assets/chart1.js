/*d3.csv("data/egresso1.csv").then(function(data) {
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function(d) { return d.Local; }));
    y.domain([0, d3.max(data, function(d) { return +d["Media_Salarial"]; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Media_Salarial");

    // Create a tooltip div that is hidden by default:
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background", "lightsteelblue")
        .style("padding", "5px")
        .style("border-radius", "8px")
        .style("pointer-events", "none");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("fill", "steelblue")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Local); })
        .attr("y", function(d) { return y(+d["Media_Salarial"]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(+d["Media_Salarial"]); })
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Local: " + d.Local + "<br/>Media Salarial: " + d["Media_Salarial"] + "<br/>Diferença Relação Brasil: " + d["Diferenca_Relacao_Brasil_Porc"] + "%")
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
});
*/

/*
d3.csv("data/egresso1.csv").then(function(data) {
    var svg = d3.select("#chart1 svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function(d) { return d.Local; }));
    y.domain([0, d3.max(data, function(d) { return +d["Media_Salarial"]; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Media_Salarial");

    var tooltip = d3.select("#tooltip");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("fill", "#085e97")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Local); })
        .attr("y", function(d) { return y(+d["Media_Salarial"]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(+d["Media_Salarial"]); })
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Local: " + d.Local + "<br/>Media Salarial: " + d["Media_Salarial"] + "<br/>Diferença Relação Brasil: " + d["Diferenca_Relacao_Brasil_Porc"] + "%")
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
});
*/

/*
d3.csv("data/egresso1.csv").then(function(data) {
    var svg = d3.select("#chart1 svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function(d) { return d.Local; }));
    y.domain([0, d3.max(data, function(d) { return +d["Media_Salarial"]; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Media_Salarial");

    var tooltip = d3.select("#tooltip");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("fill", "#085e97")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Local); })
        .attr("y", function(d) { return y(+d["Media_Salarial"]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(+d["Media_Salarial"]); })
        .on("mouseover", function(event, d) {
            
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Local: " + d.Local + "<br/>Media Salarial: " + d["Media_Salarial"] + "<br/>Diferença Relação Brasil: " + d["Diferenca_Relacao_Brasil_Porc"] + "%")
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
});
*/

/*
d3.csv("data/egresso1.csv").then(function(data) {
    console.log(data); // Adicionado para depuração

    var svg = d3.select("#chart1 svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function(d) { return d.Local.trim(); }));
    y.domain([0, d3.max(data, function(d) { return +d["Media_Salarial"].trim(); })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Media_Salarial");

    var tooltip = d3.select("#tooltip");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("fill", "#085e97")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Local.trim()); })
        .attr("y", function(d) { return y(+d["Media_Salarial"].trim()); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(+d["Media_Salarial"].trim()); })
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Local: " + d.Local + "<br/>Media Salarial: " + d["Media_Salarial"] + "<br/>Diferença Relação Brasil: " + d["Diferenca_Relacao_Brasil_Porc"] + "%")
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
});

*/
/*
d3.csv("data/egresso1.csv").then(function(data) {
    console.log("Dados brutos do CSV:", data); // Adicionado para depuração

    var svg = d3.select("#chart1 svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function(d) { return d.Local.trim(); }));
    y.domain([0, d3.max(data, function(d) { return +d["Media_Salarial"].trim(); })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Media_Salarial");

    var tooltip = d3.select("#tooltip");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("fill", "#085e97")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Local.trim()); })
        .attr("y", function(d) { return y(+d["Media_Salarial"].trim()); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(+d["Media_Salarial"].trim()); })
        .on("mouseover", function(event, d) {
            console.log("Dados brutos do item:", d); // Verificação dos dados brutos

            var local = d.Local ? d.Local.trim() : "N/A";
            var mediaSalarial = d["Media_Salarial"] ? d["Media_Salarial"].trim() : "N/A";
            var diferencaRelacaoBrasilPorc = d["Diferenca_Relacao_Brasil_Porc"] ? d["Diferenca_Relacao_Brasil_Porc"].trim() : "N/A";

            console.log("Local:", local);
            console.log("Media Salarial:", mediaSalarial);
            console.log("Diferença Relação Brasil Porc:", diferencaRelacaoBrasilPorc);

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Local: " + local + "<br/>Media Salarial: " + mediaSalarial + "<br/>Diferença Relação Brasil: " + diferencaRelacaoBrasilPorc + "%")
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
});
*/
//ESSE CODIGO FUNCIONA

d3.csv("data/egresso1.csv").then(function(data) {
    var datacopia = data;
    var svg = d3.select("#chart1 svg"),
        /*margin = { top: 20, right: 20, bottom: 30, left: 50 },*/
        margin = { top: 50, right: 30, bottom: 70, left: 70 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function(d) { return d.Local.trim(); }));
    y.domain([0, d3.max(data, function(d) { return +d["Media_Salarial"].trim(); })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Media_Salarial");

    // Adding axis labels
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", height + margin.top + 45)
        .text("Estados (Sul/Sudeste)");

    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left - 50)
        .text("Média Salarial (R$)");
    
    var tooltip = d3.select("#tooltip");
    //para formatar as casas decimais
    var formatDecimal = d3.format(".2f");
    //formatando os valores monetarios 
    const formatBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("fill", "#2c697e")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Local.trim()); })
        .attr("y", function(d) { return y(+d["Media_Salarial"].trim()); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(+d["Media_Salarial"].trim()); })
        .on("mouseover", function(event, data) {

            var local = datacopia[data].Local || "N/A";
            var mediaSalarial = datacopia[data]["Media_Salarial"] || "N/A";
            var diferencaRelacaoBrasilPorc = datacopia[data]["Diferenca_Relacao_Brasil_Porc"] || "N/A";

            console.log("Local:", local);
            console.log("Media Salarial:", mediaSalarial);
            console.log("Diferença Relação Brasil Porc:", diferencaRelacaoBrasilPorc);

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Local: " + local + "<br/>Media Salarial: " + formatBR.format(mediaSalarial) + "<br/>Diferença Relação Brasil: " + formatDecimal(diferencaRelacaoBrasilPorc) + "%")
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);

        });
});

