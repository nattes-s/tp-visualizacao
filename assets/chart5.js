/*
// Set up the SVG canvas dimensions
var svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set up scales
var x = d3.scaleLinear().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Set up the tooltip
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load the data
d3.csv("data/scaterplot.csv").then(function(data) {
    // Parse the data
    var parsedData = [];
    data.forEach(function(d) {
        for (var key in d) {
            if (d.hasOwnProperty(key) && key !== "salario-generalizado") {
                parsedData.push({
                    category: key,
                    value: d[key] === "Não encontrado" ? null : +d[key],
                    found: d[key] !== "Não encontrado"
                });
            }
        }
    });

    // Set up domains for scales
    x.domain(d3.extent(parsedData, function(d) { return d.value; })).nice();
    y.domain(d3.extent(parsedData, function(d) { return d.value; })).nice();

    // Add axes
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    // Add dots
    var dots = g.selectAll(".dot")
        .data(parsedData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.value); })
        .attr("cy", function(d) { return y(d.value); })
        .attr("fill", function(d) { return color(d.category); })
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Category: " + d.category + "<br/>Value: " + d.value)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Filter functionality
    d3.select("#filter").on("change", function() {
        var selectedOption = d3.select(this).property("value");
        var filteredData = parsedData.filter(function(d) {
            if (selectedOption === "all") return true;
            if (selectedOption === "found") return d.found;
            if (selectedOption === "not_found") return !d.found;
        });
        update(filteredData);
    });

    function update(filteredData) {
        // Update dots
        dots.data(filteredData)
            .attr("cx", function(d) { return x(d.value); })
            .attr("cy", function(d) { return y(d.value); });
    }

    update(parsedData); // Initial update
});





d3.csv("data/scaterplot2.csv").then(function(data) {
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse data
    var columns = data.columns;
    var parsedData = [];
    data.forEach(d => {
        columns.forEach(col => {
            if (d[col] !== "Não encontrado") {
                parsedData.push({category: col, value: +d[col], found: d[col] !== "Não encontrado"});
            }
        });
    });

    // Create scales
    var x = d3.scalePoint().domain(columns).range([0, width]).padding(0.5);
    var y = d3.scaleLinear().domain([0, d3.max(parsedData, d => d.value)]).nice().range([height, 0]);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add axes
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10));

    // Add points
    g.selectAll(".dot")
        .data(parsedData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.category))
        .attr("cy", d => y(d.value))
        .attr("r", 5)
        .attr("fill", d => color(d.category))
        .attr("opacity", 0.7);

    // Add filter functionality
    var foundCheckbox = d3.select("body").append("input")
        .attr("type", "checkbox")
        .attr("id", "foundCheckbox")
        .on("change", update);

    d3.select("body").append("label")
        .attr("for", "foundCheckbox")
        .text("Mostrar somente valores encontrados");

    function update() {
        var filteredData = d3.select("#foundCheckbox").property("checked") ?
            parsedData.filter(d => d.found) : parsedData;

        var circles = g.selectAll(".dot").data(filteredData, d => d.category + d.value);

        circles.enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.category))
            .attr("cy", d => y(d.value))
            .attr("r", 5)
            .attr("fill", d => color(d.category))
            .attr("opacity", 0.7)
            .merge(circles)
            .transition()
            .duration(750)
            .attr("cx", d => x(d.category))
            .attr("cy", d => y(d.value));

        circles.exit().remove();
    }
});
*/

/*
d3.csv("data/scaterplot.csv").then(function(data) {
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 50, left: 100},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse data
    var columns = data.columns;
    var parsedData = [];
    data.forEach(d => {
        columns.forEach(col => {
            if (d[col] !== "Não encontrado") {
                parsedData.push({category: col, value: +d[col], found: d[col] !== "Não encontrado"});
            }
        });
    });
    console.log(d3.max(parsedData, d => d.value))
    // Create scales
    var y = d3.scalePoint().domain(columns).range([0, height]).padding(0.5);
    var x = d3.scaleLinear().domain([0, d3.max(parsedData, d => d.value)]).nice().range([0, width]);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add axes
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("$.2f")));

    // Add points
    g.selectAll(".dot")
        .data(parsedData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.value))
        .attr("cy", d => y(d.category))
        .attr("r", 5)
        .attr("fill", d => color(d.category))
        .attr("opacity", 0.7);

    // Add filter functionality
    var foundCheckbox = d3.select("body").append("input")
        .attr("type", "checkbox")
        .attr("id", "foundCheckbox")
        .on("change", update);

    d3.select("body").append("label")
        .attr("for", "foundCheckbox")
        .text("Mostrar somente valores encontrados");

    function update() {
        var filteredData = d3.select("#foundCheckbox").property("checked") ?
            parsedData.filter(d => d.found) : parsedData;

        var circles = g.selectAll(".dot").data(filteredData, d => d.category + d.value);

        circles.enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.value))
            .attr("cy", d => y(d.category))
            .attr("r", 5)
            .attr("fill", d => color(d.category))
            .attr("opacity", 0.7)
            .merge(circles)
            .transition()
            .duration(750)
            .attr("cx", d => x(d.value))
            .attr("cy", d => y(d.category));

        circles.exit().remove();
    }
});
*/

/*
d3.csv("data/scaterplot.csv").then(function(data) {
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 50, left: 100},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse data
    var columns = data.columns;
    var parsedData = [];
    data.forEach(d => {
        columns.forEach(col => {
            //console.log(d[col])
            if (d[col] !== "Não encontrado") {
                console.log(d[col], parseFloat(d[col]));
                parsedData.push({category: col, value: +d[col], found: d[col] !== "Não encontrado"});
            }
        });
    });

    
    var xMax = d3.max(parsedData, d => d.value);
    console.log(xMax)

    // Create scales
    var y = d3.scalePoint().domain(columns).range([0, height]).padding(0.5);
    var x = d3.scaleLinear().domain([0, xMax]).nice().range([0, width]);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add axes
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("$.2f")));

    // Add points
    var dots = g.selectAll(".dot")
        .data(parsedData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.value))
        .attr("cy", d => y(d.category))
        .attr("r", 5)
        .attr("fill", d => color(d.category))
        .attr("opacity", 0.7);

    // Add tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    dots.on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(d.category + "<br/>" + d.value)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    }).on("mouseout", function(d) {
        tooltip.transition().duration(500).style("opacity", 0);
    });

    // Add filter functionality
    d3.select("#filter").on("change", update);

    function update() {
        var filterValue = d3.select("#filter").property("value");
        var filteredData;

        if (filterValue === "found") {
            filteredData = parsedData.filter(d => d.found);
        } else if (filterValue === "not_found") {
            filteredData = parsedData.filter(d => !d.found);
        } else {
            filteredData = parsedData;
        }

        var circles = g.selectAll(".dot").data(filteredData, d => d.category + d.value);

        circles.enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.value))
            .attr("cy", d => y(d.category))
            .attr("r", 5)
            .attr("fill", d => color(d.category))
            .attr("opacity", 0.7)
            .merge(circles)
            .transition()
            .duration(750)
            .attr("cx", d => x(d.value))
            .attr("cy", d => y(d.category));

        circles.exit().remove();
    }
});
*/

/*d3.csv("data/scaterplot.csv").then(function(data) {
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 50, left: 100},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse data
    var columns = data.columns;
    var parsedData = [];
    data.forEach(d => {
        columns.forEach(col => {
            if (d[col] !== "Não encontrado") {
                // Remove separadores de milhar e converta para número
                var valueStr = d[col].replace(/\./g, '').replace(',', '.');
                var value = +valueStr;
                //console.log(d[col], valueStr, value);  // Verifique a conversão aqui
                if (!isNaN(value)) {
                    parsedData.push({category: col, value: value, found: d[col] !== "Não encontrado"});
                }
            }
        });
    });

    //console.log(parsedData);

    // Calculate xMax
    var xMax = d3.max(parsedData, d => d.value);
    //console.log("Valor máximo recalculado: ", xMax);

    // Create scales
    var y = d3.scalePoint().domain(columns).range([0, height]).padding(0.5);
    var x = d3.scaleLinear().domain([0, xMax]).nice().range([0, width]);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add axes
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("$.2f")));

    // Add points
    g.selectAll(".dot")
        .data(parsedData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.value))
        .attr("cy", d => y(d.category))
        .attr("r", 5)
        .attr("fill", d => color(d.category))
        .attr("opacity", 0.7);

    // Add filter functionality
   
    function update() {
        var filteredData = d3.select("#foundCheckbox").property("checked") ?
            parsedData.filter(d => d.found) : parsedData;

        var circles = g.selectAll(".dot").data(filteredData, d => d.category + d.value);

        circles.enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.value))
            .attr("cy", d => y(d.category))
            .attr("r", 5)
            .attr("fill", d => color(d.category))
            .attr("opacity", 0.7)
            .merge(circles)
            .transition()
            .duration(750)
            .attr("cx", d => x(d.value))
            .attr("cy", d => y(d.category));

        circles.exit().remove();
    }
});
*/

d3.csv("data/scaterplot.csv").then(function(data) {
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 70, left: 100},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse data
    var columns = data.columns;
    var parsedData = [];
    data.forEach(d => {
        columns.forEach(col => {
            if (d[col] !== "Não encontrado") {
                // Remove separadores de milhar e converta para número
                var valueStr = d[col].replace(/\./g, '').replace(',', '.');
                var value = +valueStr;
                if (!isNaN(value)) {
                    parsedData.push({category: col, value: value, found: d[col] !== "Não encontrado"});
                }
            }
        });
    });

    // Calculate xMax
    var xMax = d3.max(parsedData, d => d.value);

    // Create scales
    var y = d3.scalePoint().domain(columns).range([0, height]).padding(0.5);
    var x = d3.scaleLinear().domain([0, xMax]).nice().range([0, width]);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add axes
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("$.2f")));

    // Add tooltip
    const tooltip = d3.select("#tooltip");
    //var tooltip = d3.select("body").append("div")
        //.attr("class", "tooltip")
        //.style("opacity", 0);

    const formatBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Add points
    g.selectAll(".dot")
        .data(parsedData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.value))
        .attr("cy", d => y(d.category))
        .attr("r", 5)
        .attr("fill", d => color(d.category))
        .attr("opacity", 0.7)
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Salário: " + formatBR.format(parsedData[d].value))
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    function update() {
        var filteredData = d3.select("#foundCheckbox").property("checked") ?
            parsedData.filter(d => d.found) : parsedData;

        var circles = g.selectAll(".dot").data(filteredData, d => d.category + d.value);

        circles.enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.value))
            .attr("cy", d => y(d.category))
            .attr("r", 5)
            .attr("fill", d => color(d.category))
            .attr("opacity", 0.7)
            .merge(circles)
            .transition()
            .duration(750)
            .attr("cx", d => x(d.value))
            .attr("cy", d => y(d.category));

        circles.exit().remove();

        g.selectAll(".dot")
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("Valor: " + d.value)
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }
    // Add labels to the axes
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", height + margin.top + 50)
        .text("Valores");

    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", margin.left - 60)
        .text("Estados (Sul/Sudeste)");
});
