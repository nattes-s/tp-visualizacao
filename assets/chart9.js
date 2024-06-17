/*d3.csv("data/coletados.csv").then(data => {
    const width = 500,
        height = 500,
        margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#chart9 svg")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeCategory10);

    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(d3.entries(data[0]));
    console.log(data_ready)
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.key))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(event, d) {
            console.log(data_ready[d].data.value) 
            console.log(data_ready[d].data.value) 

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Categoria: ${data_ready[d].data.key}<br>Valor: ${data_ready[d].data.value}`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    const legend = svg.selectAll(".legend")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(90,${i * 20 - 100})`);

    legend.append("rect")
        .attr("x", width / 2 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => color(d.data.key));

    legend.append("text")
        .attr("x", width / 2 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d.data.key);
});
*/
/*
d3.csv("data/coletados.csv").then(data => {
    const width = 500,
        height = 500,
        margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#chart9 svg")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data)
        .range(["#204d57", "#5a8b99"]);

    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(d3.entries(data[0]));
    console.log(data_ready);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.key))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(event, d) {
            console.log(d.data.value);

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Categoria: ${data_ready[d].data.key}<br>Valor: ${data_ready[d].data.value}`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    const legend = svg.selectAll(".legend")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(90,${i * 20 - 100})`);

    legend.append("rect")
        .attr("x", width / 2 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => color(d.data.key));

    legend.append("text")
        .attr("x", width / 2 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d.data.key);
});
*/

/*
d3.csv("data/coletados.csv").then(data => {
    const width = 500,
        height = 500,
        margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#chart9 svg")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeCategory10);

    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(d3.entries(data[0]));

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.key))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Categoria: ${data_ready[d].data.key}<br>Valor: ${data_ready[d].data.value}`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svg.selectAll('text')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => d.data.value)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 15);

    const legend = svg.selectAll(".legend")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(-50,${i * 20 - 100})`);

    legend.append("rect")
        .attr("x", width / 2 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => color(d.data.key));

    legend.append("text")
        .attr("x", width / 2 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d.data.key);
});
*/

/*
d3.csv("data/coletados.csv").then(data => {
    const width = 500,
        height = 500,
        margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#chart9 svg")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data)
        .range(["#204d57", "#5a8b99"]);

    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(d3.entries(data[0]));

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.key))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Categoria: ${data_ready[d].data.key}<br>Valor: ${data_ready[d].data.value}`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svg.selectAll('text')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => d.data.value)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .style("fill", "black"); // Altera a cor do texto para preto

    const legend = svg.selectAll(".legend")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(90,${i * 20 - 100})`);

    legend.append("rect")
        .attr("x", width / 2 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => color(d.data.key));

    legend.append("text")
        .attr("x", width / 2 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d.data.key);
});
*/

/*
d3.csv("data/coletados.csv").then(data => {
    const width = 500,
        height = 500,
        margin = 40;
        margin = 40;
        

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#chart9 svg")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data)
        .range(["#204d57", "#a8c4ce"]);

    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(d3.entries(data[0]));

    const arc = d3.arc()
        .innerRadius(radius * 0.5)  // Tamanho do furo no meio (gráfico de donut)
        .outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.key))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Categoria: ${data_ready[d].data.key}<br>Valor: ${data_ready[d].data.value}`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Adicionar porcentagens dentro de cada fatia
    const total = d3.sum(data_ready, d => d.value);
    svg.selectAll('text')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => `${(d.data.value / total * 100).toFixed(2)}%`)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .style("fill", "black");

    const legend = svg.selectAll(".legend")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(90,${i * 20 - 100})`);

    legend.append("rect")
        .attr("x", width / 2 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => color(d.data.key));

    legend.append("text")
        .attr("x", width / 2 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d.data.key);
});
*/

d3.csv("data/coletados.csv").then(data => {
    
    const width = 600,
        height = 500,
        margin = 80;
       
       

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#chart9 svg")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(["NaoColetados", "Coletados"]) // Assegure-se de que as categorias correspondem
        .range(["#204d57", "#a8c4ce"]);

    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(d3.entries(data[0]));
    data_ready[0].data.key = "Não Coletado"
    data_ready[1].data.key = "Coletado"
    const arc = d3.arc()
        .innerRadius(radius * 0.5)  // Tamanho do furo no meio (gráfico de donut)
        .outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.key))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Categoria: ${data_ready[d].data.key}<br>Valor absoluto: ${data_ready[d].data.value}`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Adicionar porcentagens dentro de cada fatia
    const total = d3.sum(data_ready, d => d.value);
    svg.selectAll('text')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => `${(d.data.value / total * 100).toFixed(2)}%`)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .style("fill", "black");

    const legend = svg.selectAll(".legend")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(110,${i * 20})`); // Ajuste da posição da legenda

    legend.append("rect")
        .attr("x", width / 2 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => color(d.data.key));

    legend.append("text")
        .attr("x", width / 2 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => d.data.key);
});
