
/*
d3.csv('confianca2.csv').then(function(data) {
    // Parse the data and set dimensions
    const margin = {top: 40, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart4")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#d53e4f", "#f46d43", "#fee08b"]);

    const stack = d3.stack();

    const keys = ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

    x.domain(data.map(d => d.Local));
    y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();
    z.domain(keys);

    svg.append("g")
        .selectAll("g")
        .data(stack.keys(keys)(data))
        .enter().append("g")
        .attr("fill", d => z(d.key))
        .selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x", d => x(d.data.Local))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth());

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(10, "s"));

    const legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);

    d3.select("#filterNotFound").on("change", function() {
        const checked = d3.select(this).property("checked");
        const filteredData = checked ? data : data.filter(d => d["flag-generalizado"] !== "Não encontrado");

        x.domain(filteredData.map(d => d.Local));
        y.domain([0, d3.max(filteredData, d => d3.sum(keys, k => +d[k]))]).nice();

        svg.selectAll("g.layer")
            .data(stack.keys(keys)(filteredData))
            .selectAll("rect")
            .data(d => d)
            .transition()
            .attr("x", d => x(d.data.Local))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth());

        svg.select(".axis--x")
            .transition()
            .call(d3.axisBottom(x));

        svg.select(".axis--y")
            .transition()
            .call(d3.axisLeft(y).ticks(10, "s"));
    });
});
*/

/*
d3.csv('data/confianca3.csv').then(function(data) {
    // Parse the data and set dimensions
    const margin = {top: 40, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart4 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#36add0", "#085e97", "#062e66"]);

    const stack = d3.stack();

    const keys = ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

    x.domain(data.map(d => d.Local));
    y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();
    z.domain(keys);
    
    svg.append("g")
        .selectAll("g")
        .data(stack.keys(keys)(data))
        .enter().append("g")
        .attr("fill", d => z(d.key))
        .selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x", d => x(d.data.Local))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth());

    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "s"));

    const legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);
});
*/

/*
d3.csv('data/confianca3.csv').then(function(data) {
    // Parse the data and set dimensions
    const margin = {top: 40, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart4 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Sort data by "Confiança muito alta"
    data.sort((a, b) => b["Confiança muito alta"] - a["Confiança muito alta"]);

    // Filter function
    function filterData(showAll) {
        if (!showAll) {
            return data.map(d => {
                return {
                    Local: d.Local,
                    "Baixa confiança": +d["Baixa confiança"] || 0,
                    "Alta confiança": +d["Alta confiança"] || 0,
                    "Confiança muito alta": +d["Confiança muito alta"] || 0
                };
            });
        } else {
            return data;
        }
    }

    function updateChart(showAll) {
        const filteredData = filterData(showAll);

        const keys = showAll ? ["Baixa confiança", "Alta confiança", "Confiança muito alta", "Não encontrado"]
                             : ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

        x.domain(filteredData.map(d => d.Local));
        y.domain([0, d3.max(filteredData, d => d3.sum(keys, k => +d[k]))]).nice();
        z.domain(keys);

        svg.selectAll("g").remove();

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(filteredData))
            .enter().append("g")
            .attr("fill", d => z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.Local))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth());

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "s"));

        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
    }

    // Initial chart rendering
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#36add0", "#085e97", "#062e66", "#bbbbbb"]);

    // Render chart with all data initially
    updateChart(true);

    // Add event listeners for filter buttons
    d3.select("#filter-all").on("click", () => updateChart(true));
    d3.select("#filter-no-na").on("click", () => updateChart(false));
});
*/

/*
d3.csv('data/confianca3.csv').then(function(data) {
    // Parse the data and set dimensions
    const margin = {top: 40, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart4 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Sort data by "Confiança muito alta"
    data.sort((a, b) => b["Confiança muito alta"] - a["Confiança muito alta"]);

    // Filter function
    function filterData(showAll) {
        if (!showAll) {
            return data.map(d => {
                return {
                    Local: d.Local,
                    "Baixa confiança": +d["Baixa confiança"] || 0,
                    "Alta confiança": +d["Alta confiança"] || 0,
                    "Confiança muito alta": +d["Confiança muito alta"] || 0
                };
            });
        } else {
            return data;
        }
    }
    console.log(data)
    function updateChart(showAll) {
        const filteredData = filterData(showAll);

        const keys = showAll ? ["Baixa confiança", "Alta confiança", "Confiança muito alta", "Não encontrado"]
                             : ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

        x.domain(filteredData.map(d => d.Local));
        y.domain([0, d3.max(filteredData, d => d3.sum(keys, k => +d[k]))]).nice();
        z.domain(keys);

        svg.selectAll("g").remove();

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(filteredData))
            .enter().append("g")
            .attr("fill", d => z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.Local))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
            .on("mouseover", function(event, d) {
                const total = d.data["Baixa confiança"] + d.data["Alta confiança"] + d.data["Confiança muito alta"];
                const notFound = d.data["Não encontrado"] || 0;
                const content = showAll ?
                    `Local: ${d.data.Local}<br>Baixa confiança: ${d.data["Baixa confiança"]}<br>Alta confiança: ${d.data["Alta confiança"]}<br>Confiança muito alta: ${d.data["Confiança muito alta"]}<br>Não encontrado: ${notFound}<br>Total: ${total}` :
                    `Local: ${d.data.Local}<br>Baixa confiança: ${d.data["Baixa confiança"]}<br>Alta confiança: ${d.data["Alta confiança"]}<br>Confiança muito alta: ${d.data["Confiança muito alta"]}<br>Total: ${total}`;

                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(content)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "s"));

        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
    }

    // Initial chart rendering
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#36add0", "#085e97", "#062e66", "#bbbbbb"]);

    // Tooltip
    const tooltip = d3.select("#tooltip");

    // Render chart with all data initially
    updateChart(true);

    // Add event listeners for filter buttons
    d3.select("#filter-all").on("click", () => updateChart(true));
    d3.select("#filter-no-na").on("click", () => updateChart(false));
});
*/

/*
d3.csv('data/confianca3.csv').then(function(data) {
    const margin = {top: 40, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart4 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    data.forEach(d => {
        d["Baixa confiança"] = +d["Baixa confiança"];
        d["Alta confiança"] = +d["Alta confiança"];
        d["Confiança muito alta"] = +d["Confiança muito alta"];
        d["Não encontrado"] = +d["Não encontrado"];
    });

    // Sort data by "Confiança muito alta"
    //data.sort((a, b) => b["Confiança muito alta"] - a["Confiança muito alta"]);
       data.sort((a, b) => (b["Baixa confiança"] + b["Alta confiança"] + b["Confiança muito alta"]) - (a["Baixa confiança"] + a["Alta confiança"] + a["Confiança muito alta"]));
    
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#36add0", "#085e97", "#062e66", "#bbbbbb"]);

    // Tooltip
    const tooltip = d3.select("#tooltip");

    function filterData(showAll) {
        if (!showAll) {
            return data.map(d => {
                return {
                    Local: d.Local,
                    "Baixa confiança": d["Baixa confiança"],
                    "Alta confiança": d["Alta confiança"],
                    "Confiança muito alta": d["Confiança muito alta"]
                };
            });
        } else {
            return data;
        }
    }

    function updateChart(showAll) {
        const filteredData = filterData(showAll);

        const keys = showAll ? ["Baixa confiança", "Alta confiança", "Confiança muito alta", "Não encontrado"]
                             : ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

        x.domain(filteredData.map(d => d.Local));
        y.domain([0, d3.max(filteredData, d => d3.sum(keys, k => d[k]))]).nice();
        z.domain(keys);

        svg.selectAll("g").remove();

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(filteredData))
            .enter().append("g")
            .attr("fill", d => z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.Local))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`${d.data.Local}<br>${d[1] - d[0]}`)
                    .style("left", (event.pageX - 34) + "px")
                    .style("top", (event.pageY - 12) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "s"));

        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(-50,${i * 20})`);

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
    }

    updateChart(true);

    d3.select("#filter-all").on("click", () => updateChart(true));
    d3.select("#filter-no-na").on("click", () => updateChart(false));
});
*/

/*
d3.csv('data/confianca3.csv').then(function(data) {
    const margin = {top: 40, right: 120, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart4 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    data.forEach(d => {
        d["Baixa confiança"] = +d["Baixa confiança"];
        d["Alta confiança"] = +d["Alta confiança"];
        d["Confiança muito alta"] = +d["Confiança muito alta"];
        d["Não encontrado"] = +d["Não encontrado"];
    });

    // Sort data by the sum of "Baixa confiança", "Alta confiança", and "Confiança muito alta"
    data.sort((a, b) => (b["Baixa confiança"] + b["Alta confiança"] + b["Confiança muito alta"]) - (a["Baixa confiança"] + a["Alta confiança"] + a["Confiança muito alta"]));

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#36add0", "#085e97", "#062e66", "#bbbbbb"]);

    // Tooltip
    const tooltip = d3.select("#tooltip");

    function filterData(showAll) {
        if (!showAll) {
            return data.map(d => {
                return {
                    Local: d.Local,
                    "Baixa confiança": d["Baixa confiança"],
                    "Alta confiança": d["Alta confiança"],
                    "Confiança muito alta": d["Confiança muito alta"]
                };
            });
        } else {
            return data;
        }
    }

    function updateChart(showAll) {
        const filteredData = filterData(showAll);

        const keys = showAll ? ["Baixa confiança", "Alta confiança", "Confiança muito alta", "Não encontrado"]
                             : ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

        x.domain(filteredData.map(d => d.Local));
        y.domain([0, d3.max(filteredData, d => d3.sum(keys, k => d[k]))]).nice();
        z.domain(keys);

        svg.selectAll("g").remove();

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(filteredData))
            .enter().append("g")
            .attr("fill", d => z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.Local))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`${d.data.Local}<br>${d[1] - d[0]}`)
                    .style("left", (event.pageX - 34) + "px")
                    .style("top", (event.pageY - 12) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "s"));

        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "start")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(${width + 20},${i * 20})`);

        legend.append("rect")
            .attr("x", 0)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
    }

    updateChart(true);

    d3.select("#filter-all").on("click", () => updateChart(true));
    d3.select("#filter-no-na").on("click", () => updateChart(false));
});
*/

/*
d3.csv('data/confianca3.csv').then(function(data) {
    var datacopia = data;
    const margin = {top: 40, right: 120, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart4 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    data.forEach(d => {
        d["Baixa confiança"] = +d["Baixa confiança"] || 0;
        d["Alta confiança"] = +d["Alta confiança"] || 0;
        d["Confiança muito alta"] = +d["Confiança muito alta"] || 0;
        d["Não encontrado"] = +d["Não encontrado"] || 0;
    });

    // Sort data by the sum of "Baixa confiança", "Alta confiança", and "Confiança muito alta"
    data.sort((a, b) => (b["Baixa confiança"] + b["Alta confiança"] + b["Confiança muito alta"]) - (a["Baixa confiança"] + a["Alta confiança"] + a["Confiança muito alta"]));

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#5a8b99", "#2c697e", "#204d57", "#bbbbbb"]);

    // Tooltip
    const tooltip = d3.select("#tooltip");

    function filterData(showAll) {
        if (!showAll) {
            return data.map(d => {
                return {
                    Local: d.Local,
                    "Baixa confiança": d["Baixa confiança"],
                    "Alta confiança": d["Alta confiança"],
                    "Confiança muito alta": d["Confiança muito alta"]
                };
            });
        } else {
            return data;
        }
    }

    function updateChart(showAll) {
        const filteredData = filterData(showAll);

        const keys = showAll ? ["Baixa confiança", "Alta confiança", "Confiança muito alta", "Não encontrado"]
                             : ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

        x.domain(filteredData.map(d => d.Local));
        y.domain([0, d3.max(filteredData, d => d3.sum(keys, k => d[k]))]).nice();
        z.domain(keys);

        svg.selectAll("g").remove();

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(filteredData))
            .enter().append("g")
            .attr("fill", d => z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.Local))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`${datacopia[d].Local}<br>${d[1] - d[0]}`)
                    .style("left", (event.pageX - 34) + "px")
                    .style("top", (event.pageY - 12) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "s"));

        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "start")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(${width + 20},${i * 20})`);

        legend.append("rect")
            .attr("x", 0)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
    }

    updateChart(true);

    d3.select("#filter-all").on("click", () => updateChart(true));
    d3.select("#filter-no-na").on("click", () => updateChart(false));
});
*/


d3.csv('data/confianca3.csv').then(function(data) {
    var datacopia = data;
    const margin = {top: 40, right: 200, bottom: 70, left: 70},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart4 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    data.forEach(d => {
        d["Baixa confiança"] = +d["Baixa confiança"] || 0;
        d["Alta confiança"] = +d["Alta confiança"] || 0;
        d["Confiança muito alta"] = +d["Confiança muito alta"] || 0;
        d["Não encontrado"] = +d["Não encontrado"] || 0;
    });

    // Sort data by the sum of "Baixa confiança", "Alta confiança", and "Confiança muito alta"
    data.sort((a, b) => (b["Baixa confiança"] + b["Alta confiança"] + b["Confiança muito alta"]) - (a["Baixa confiança"] + a["Alta confiança"] + a["Confiança muito alta"]));

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#5a8b99", "#2c697e", "#204d57", "#bbbbbb"]);

    // Tooltip
    const tooltip = d3.select("#tooltip");

    function filterData(showAll) {
        if (!showAll) {
            return data.map(d => {
                return {
                    Local: d.Local,
                    "Baixa confiança": d["Baixa confiança"],
                    "Alta confiança": d["Alta confiança"],
                    "Confiança muito alta": d["Confiança muito alta"]
                };
            });
        } else {
            return data;
        }
    }

    function updateChart(showAll) {
        const filteredData = filterData(showAll);

        const keys = showAll ? ["Baixa confiança", "Alta confiança", "Confiança muito alta", "Não encontrado"]
                             : ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

        x.domain(filteredData.map(d => d.Local));
        y.domain([0, d3.max(filteredData, d => d3.sum(keys, k => d[k]))]).nice();
        z.domain(keys);

        svg.selectAll("g").remove();

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(filteredData))
            .enter().append("g")
            .attr("fill", d => z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.Local))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);

                //const tooltipData = datacopia.find(item => item.Local === d.data.Local);

                if (showAll) {
                    tooltip.html(`Local: ${datacopia[d].Local}<br>Baixa confiança: ${datacopia[d]["Baixa confiança"]}<br>Alta confiança: ${datacopia[d]["Alta confiança"]}<br>Confiança muito alta: ${datacopia[d]["Confiança muito alta"]}<br>Não encontrado: ${datacopia[d]["Não encontrado"]}`)
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else {
                    tooltip.html(`Local: ${datacopia[d].Local}<br>Baixa confiança: ${datacopia[d]["Baixa confiança"]}<br>Alta confiança: ${datacopia[d]["Alta confiança"]}<br>Confiança muito alta: ${datacopia[d]["Confiança muito alta"]}`)
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }
            })
            .on("mouseout", function() {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "s"));

        const legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "start")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(${width + 20},${i * 20})`);

        legend.append("rect")
            .attr("x", 0)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);

        // Add axis labels
        svg.append("text")
            .attr("class", "x-axis-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("Estados");

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .text("Nível de confiança");       
    }

    updateChart(true);

    d3.select("#filter-all").on("click", () => updateChart(true));
    d3.select("#filter-no-na").on("click", () => updateChart(false));
});



/*
d3.csv('data/confianca3.csv').then(function(data) {
    var datacopia = data;

    const svg = d3.select("#chart4 svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 960 500")
        .classed("svg-content-responsive", true);


         const margin = {top: 40, right: 120, bottom: 70, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    data.forEach(d => {
        d["Baixa confiança"] = +d["Baixa confiança"] || 0;
        d["Alta confiança"] = +d["Alta confiança"] || 0;
        d["Confiança muito alta"] = +d["Confiança muito alta"] || 0;
        d["Não encontrado"] = +d["Não encontrado"] || 0;
    });

    // Sort data by the sum of "Baixa confiança", "Alta confiança", and "Confiança muito alta"
    data.sort((a, b) => (b["Baixa confiança"] + b["Alta confiança"] + b["Confiança muito alta"]) - (a["Baixa confiança"] + a["Alta confiança"] + a["Confiança muito alta"]));

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]),
          z = d3.scaleOrdinal().range(["#5a8b99", "#2c697e", "#204d57", "#bbbbbb"]);

    // Tooltip
    const tooltip = d3.select("#tooltip");

    function filterData(showAll) {
        if (!showAll) {
            return data.map(d => {
                return {
                    Local: d.Local,
                    "Baixa confiança": d["Baixa confiança"],
                    "Alta confiança": d["Alta confiança"],
                    "Confiança muito alta": d["Confiança muito alta"]
                };
            });
        } else {
            return data;
        }
    }

    function updateChart(showAll) {
        const filteredData = filterData(showAll);

        const keys = showAll ? ["Baixa confiança", "Alta confiança", "Confiança muito alta", "Não encontrado"]
                             : ["Baixa confiança", "Alta confiança", "Confiança muito alta"];

        x.domain(filteredData.map(d => d.Local));
        y.domain([0, d3.max(filteredData, d => d3.sum(keys, k => d[k]))]).nice();
        z.domain(keys);

        g.selectAll("g").remove();

        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(filteredData))
            .enter().append("g")
            .attr("fill", d => z(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", d => x(d.data.Local))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);

                if (showAll) {
                    tooltip.html(`Local: ${datacopia[d].Local}<br>Baixa confiança: ${datacopia[d]["Baixa confiança"]}<br>Alta confiança: ${datacopia[d]["Alta confiança"]}<br>Confiança muito alta: ${datacopia[d]["Confiança muito alta"]}<br>Não encontrado: ${datacopia[d]["Não encontrado"]}`)
                        .style("left", (d3.event.pageX + 15) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else {
                    tooltip.html(`Local: ${datacopia[d].Local}<br>Baixa confiança: ${datacopia[d]["Baixa confiança"]}<br>Alta confiança: ${datacopia[d]["Alta confiança"]}<br>Confiança muito alta: ${datacopia[d]["Confiança muito alta"]}`)
                        .style("left", (d3.event.pageX + 15) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }
            })
            .on("mouseout", function() {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "s"));

        const legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "start")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(${width + 20},${i * 20})`);

        legend.append("rect")
            .attr("x", 0)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);

        // Add labels to the axes
        svg.append("text")
            .attr("class", "x-axis-label")
            .attr("text-anchor", "middle")
            .attr("x", margin.left + width / 2)
            .attr("y", height + margin.top + 40)
            .text("Estados");

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", margin.left - 40)
            .text("Número de Confiança");
    }

    updateChart(true);

    d3.select("#filter-all").on("click", () => updateChart(true));
    d3.select("#filter-no-na").on("click", () => updateChart(false));

    // Add a resize listener
    window.addEventListener('resize', () => {
        const targetWidth = parseInt(d3.select("#chart4").style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    });

    const aspect = 960 / 500;
    const chart = d3.select("#chart4");
    chart.style("position", "relative");
    const svgElement = chart.select("svg");
    svgElement.attr("width", chart.node().getBoundingClientRect().width);
    svgElement.attr("height", chart.node().getBoundingClientRect().width / aspect);

   
});
*/