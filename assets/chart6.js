/*
d3.csv("data/egresso1.csv").then(function(data) {
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 50, left: 100},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Find Brazil reference data
    var brazilData = data.find(d => d.Local === "Brasil");
    var brazilValue = +brazilData.Diferenca_Relacao_Brasil_Porc;

    // Create scales
    var x = d3.scaleLinear()
        .domain([d3.min(data, d => +d.Diferenca_Relacao_Brasil_Porc), d3.max(data, d => +d.Diferenca_Relacao_Brasil_Porc)])
        .range([0, width]);

    var y = d3.scaleBand()
        .domain(data.map(d => d.Local))
        .range([height, 0])
        .padding(0.1);

    // Add axes
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format(".2f")));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    // Add bars
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(Math.min(0, +d.Diferenca_Relacao_Brasil_Porc)))
        .attr("y", d => y(d.Local))
        .attr("width", d => Math.abs(x(+d.Diferenca_Relacao_Brasil_Porc) - x(0)))
        .attr("height", y.bandwidth())
        .attr("fill", d => d.Local === "Brasil" ? "gray" : (+d.Diferenca_Relacao_Brasil_Porc > brazilValue ? "#204d57" : "#5a8b99"));

    // Add labels
    g.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(Math.min(0, +d.Diferenca_Relacao_Brasil_Porc)) + (d.Diferenca_Relacao_Brasil_Porc < 0 ? -5 : 5))
        .attr("y", d => y(d.Local) + y.bandwidth() / 2 + 4)
        .attr("text-anchor", d => d.Diferenca_Relacao_Brasil_Porc < 0 ? "end" : "start")
        //.text(d => d3.format(".2f")(d.Diferenca_Relacao_Brasil_Porc));
});
*/

d3.csv("data/egresso1.csv").then(function(data) {
    var datacopia = data
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 50, left: 100},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Find Brazil reference data
    var brazilData = data.find(d => d.Local === "Brasil");
    var brazilValue = +brazilData.Diferenca_Relacao_Brasil_Porc;
    var brazilSalary = +brazilData.Media_Salarial; 
    
    // Create scales
    var x = d3.scaleLinear()
        .domain([d3.min(data, d => +d.Diferenca_Relacao_Brasil_Porc), d3.max(data, d => +d.Diferenca_Relacao_Brasil_Porc)])
        .range([0, width]);

    var y = d3.scaleBand()
        .domain(data.map(d => d.Local))
        .range([height, 0])
        .padding(0.1);

    // Add axes
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format(".2f")));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    // Add tooltip
    const tooltip = d3.select("#tooltip");
    //var tooltip = d3.select("body").append("div")
        //.attr("class", "tooltip")
        //.style("opacity", 0);
    //Formatação para valores monetários brasileiros
    const formatBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    var formatDecimal = d3.format(".2f");
    // var mediaEstado = "R$: " + formatBR(d.Media_Salarial);
       // var mediaBrasil = "R$: " + formatBR(brazilSalary);
       // var diferenca =  formatDecimal(d.Diferenca_Relacao_Brasil_Porc) + "%";
    
    // Add bars
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(Math.min(0, +d.Diferenca_Relacao_Brasil_Porc)))
        .attr("y", d => y(d.Local))
        .attr("width", d => Math.abs(x(+d.Diferenca_Relacao_Brasil_Porc) - x(0)))
        .attr("height", y.bandwidth())
        .attr("fill", d => d.Local === "Brasil" ? "gray" : (+d.Diferenca_Relacao_Brasil_Porc > brazilValue ? "#204d57" : "#5a8b99"))
        .on("mouseover", function(event, d) {
            
            var mediaEstado = formatBR.format(datacopia[d].Media_Salarial)
            var mediaBrasil = formatBR.format(brazilSalary) 
            var diferenca =  formatDecimal(datacopia[d].Diferenca_Relacao_Brasil_Porc) + "%";
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(
                "Estado: " + datacopia[d].Local + "<br>" +
                "Média Salarial do Estado: " + mediaEstado + "<br>" + 
                "Média Salarial do Brasil: " + mediaBrasil + "<br>" +
                "Diferença Relação Brasil (%): " + diferenca 
            )
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Add labels
    g.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(Math.min(0, +d.Diferenca_Relacao_Brasil_Porc)) + (d.Diferenca_Relacao_Brasil_Porc < 0 ? -5 : 5))
        .attr("y", d => y(d.Local) + y.bandwidth() / 2 + 4)
        .attr("text-anchor", d => d.Diferenca_Relacao_Brasil_Porc < 0 ? "end" : "start")
        //.text(d => d3.format(".2f")(d.Diferenca_Relacao_Brasil_Porc));

    // Add labels to the axes
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", height + margin.top + 40)
        .text("Diferença em Relação Brasil (%)");

    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left - 70)
        .text("Estados (Sul/Sudeste)");
});
