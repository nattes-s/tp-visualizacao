/*
// chart7.js

d3.csv("data/bloxpot.csv").then(data => {
    // Parse data
    console.log(data)
    let states = Object.keys(data[0]).slice(1);
    let salaries = states.map(state => {
        return data.map(d => +d[state]);
    });

    // Set dimensions and margins
    let margin = { top: 30, right: 30, bottom: 70, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append SVG
    let svg = d3.select("#chart7 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    let x = d3.scaleBand()
        .range([0, width])
        .domain(states)
        .paddingInner(1)
        .paddingOuter(.5);

    let y = d3.scaleLinear()
        .domain([0, d3.max(salaries.flat())])
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Compute summary statistics
    let sumstat = states.map((state, i) => {
        let stateData = salaries[i].sort(d3.ascending);
        let q1 = d3.quantile(stateData, .25);
        let median = d3.quantile(stateData, .5);
        let q3 = d3.quantile(stateData, .75);
        let interQuantileRange = q3 - q1;
        let min = q1 - 1.5 * interQuantileRange;
        let max = q3 + 1.5 * interQuantileRange;
        return { state, q1, median, q3, interQuantileRange, min, max };
    });

    // Show the boxes
    svg.selectAll("boxes")
      .data(sumstat)
      .enter()
      .append("rect")
        .attr("x", d => x(d.state) - 10)
        .attr("y", d => y(d.q3))
        .attr("height", d => y(d.q1) - y(d.q3))
        .attr("width", 20)
        .attr("stroke", "black")
        .style("fill", "#69b3a2");

    // Show median, min, and max lines
    svg.selectAll("medianLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state) - 10)
        .attr("x2", d => x(d.state) + 10)
        .attr("y1", d => y(d.median))
        .attr("y2", d => y(d.median))
        .attr("stroke", "black");

    svg.selectAll("minLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.min))
        .attr("y2", d => y(d.q1))
        .attr("stroke", "black");

    svg.selectAll("maxLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.max))
        .attr("y2", d => y(d.q3))
        .attr("stroke", "black");
});

// chart7.js

d3.csv("data/bloxpot_certo.csv").then(data => {
    // Parse data
    let states = Object.keys(data[0]);
    let salaries = states.map(state => {
        return data.map(d => +d[state]);
    });

    // Set dimensions and margins
    let margin = { top: 30, right: 30, bottom: 70, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append SVG
    let svg = d3.select("#chart7 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    let x = d3.scaleBand()
        .range([0, width])
        .domain(states)
        .paddingInner(1)
        .paddingOuter(.5);

    let y = d3.scaleLinear()
        .domain([0, d3.max(salaries.flat())])
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Compute summary statistics
    let sumstat = states.map((state, i) => {
        let stateData = salaries[i].sort(d3.ascending);
        let q1 = d3.quantile(stateData, .25);
        let median = d3.quantile(stateData, .5);
        let q3 = d3.quantile(stateData, .75);
        let interQuantileRange = q3 - q1;
        let min = q1 - 1.5 * interQuantileRange;
        let max = q3 + 1.5 * interQuantileRange;
        return { state, q1, median, q3, interQuantileRange, min, max };
    });

    // Show the boxes
    svg.selectAll("boxes")
      .data(sumstat)
      .enter()
      .append("rect")
        .attr("x", d => x(d.state) - 10)
        .attr("y", d => y(d.q3))
        .attr("height", d => y(d.q1) - y(d.q3))
        .attr("width", 20)
        .attr("stroke", "black")
        .style("fill", "#69b3a2");

    // Show median, min, and max lines
    svg.selectAll("medianLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state) - 10)
        .attr("x2", d => x(d.state) + 10)
        .attr("y1", d => y(d.median))
        .attr("y2", d => y(d.median))
        .attr("stroke", "black");

    svg.selectAll("minLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.min))
        .attr("y2", d => y(d.q1))
        .attr("stroke", "black");

    svg.selectAll("maxLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.max))
        .attr("y2", d => y(d.q3))
        .attr("stroke", "black");
});

*/


// chart6.js


/*var v = "4.050"
console.log(Number(v))*/

/*

d3.csv("data/bloxpot.csv", function(d) {
    for (let key in d) {
        if (d[key].trim() === "") {
            d[key] = NaN;  // Convert empty spaces to NaN
        } else {
            d[key + "_original"] = d[key]; // Preserve original string
            d[key] = parseFloat(d[key]); // Convert to number for calculations
        }
    }
    return d;
}).then(data => {
    // Parse data
    let states = Object.keys(data[0]).filter(key => !key.endsWith("_original"));
    let salaries = states.map(state => {
        return data.map(d => d[state]).filter(value => !isNaN(value));  // Filter out NaN values explicitly
    });

    console.log("Salaries after filtering NaN values:", salaries);

    // Set dimensions and margins
    let margin = { top: 30, right: 30, bottom: 70, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append SVG
    let svg = d3.select("#chart7 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    let x = d3.scaleBand()
        .range([0, width])
        .domain(states)
        .paddingInner(1)
        .paddingOuter(.5);

    let y = d3.scaleLinear()
        .domain([0, d3.max(salaries.flat())])
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Compute summary statistics
    let sumstat = states.map((state, i) => {
        let stateData = salaries[i].sort(d3.ascending);
        let q1 = d3.quantile(stateData, .25);
        let median = d3.quantile(stateData, .5);
        let q3 = d3.quantile(stateData, .75);
        let interQuantileRange = q3 - q1;
        let min = q1 - 1.5 * interQuantileRange;
        let max = q3 + 1.5 * interQuantileRange;
        return { state, q1, median, q3, interQuantileRange, min, max };
    });

    // Show the boxes
    svg.selectAll("boxes")
      .data(sumstat)
      .enter()
      .append("rect")
        .attr("x", d => x(d.state) - 10)
        .attr("y", d => y(d.q3))
        .attr("height", d => y(d.q1) - y(d.q3))
        .attr("width", 20)
        .attr("stroke", "black")
        .style("fill", "#69b3a2");

    // Show median, min, and max lines
    svg.selectAll("medianLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state) - 10)
        .attr("x2", d => x(d.state) + 10)
        .attr("y1", d => y(d.median))
        .attr("y2", d => y(d.median))
        .attr("stroke", "black");

    svg.selectAll("minLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.min))
        .attr("y2", d => y(d.q1))
        .attr("stroke", "black");

    svg.selectAll("maxLines")
      .data(sumstat)
      .enter()
      .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.max))
        .attr("y2", d => y(d.q3))
        .attr("stroke", "black");
});
*/

/*
d3.csv("data/bloxpot_certo.csv", function(d) {
    var datacopia = d;
    for (let key in d) {
        if (d[key].trim() === "") {
            d[key] = NaN;  // Convert empty spaces to NaN
        } else {
            //var valueStr = d[col].replace(/\./g, '').replace(',', '.');
            //var value = +valueStr;

            d[key + "_original"] = d[key]; // Preserve original string
            d[key] = parseFloat(d[key].replace(/\./g, '').replace(',', '.')); // Remove non-numeric characters and convert to number for calculations
        }
    }
    return d;
}).then(data => {
    // Parse data
    let states = Object.keys(data[0]).filter(key => !key.endsWith("_original"));
    let salaries = states.map(state => {
        return data.map(d => d[state]).filter(value => !isNaN(value));  // Filter out NaN values explicitly
    });

    console.log("Salaries after filtering NaN values:", salaries);
    const tooltip = d3.select("#tooltip");

    // Set dimensions and margins

    let margin = { top: 50, right: 30, bottom: 70, left: 70 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append SVG
    let svg = d3.select("#chart7 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    let x = d3.scaleBand()
        .range([0, width])
        .domain(states)
        .paddingInner(1)
        .paddingOuter(.5);

    let y = d3.scaleLinear()
        .domain([0, d3.max(salaries.flat())])
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");


    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));
 


    // Compute summary statistics
    let sumstat = states.map((state, i) => {
        let stateData = salaries[i].sort(d3.ascending);
        let q1 = d3.quantile(stateData, .25);
        let median = d3.quantile(stateData, .5);
        let q3 = d3.quantile(stateData, .75);
        let interQuantileRange = q3 - q1;
        let min = q1 - 1.5 * interQuantileRange;
        let max = q3 + 1.5 * interQuantileRange;
        console.log(stateData)
        console.log(q1)
        console.log(median)
        console.log(q3)
        console.log(interQuantileRange)
        console.log(min)
        console.log(max)

        return { state, q1, median, q3, interQuantileRange, min, max };
    });
    const formatBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    // Show the boxes
    svg.selectAll("boxes")
        .data(sumstat)
        .enter()
        .append("rect")
        .attr("x", d => x(d.state) - 10)
        .attr("y", d => y(d.q3))
        .attr("height", d => y(d.q1) - y(d.q3))
        .attr("width", 20)
        .attr("stroke", "black")
        .style("fill", "#2c697e")
        .on("mouseover", function(d) {
            //formatando os valores monetarios 
            var q1 = formatBR.format(d.q1);
            var median = formatBR.format(d.median);
            var q3 = formatBR.format(d.q3);
            var interQuantileRange = formatBR.format(d.interQuantileRange);
            var min = formatBR.format(d.min);
            var max = formatBR.format(d.max);

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Q1: " + q1 +
                "<br>Mediana: " + median +
                "<br>Q3: " + q3 +
                "<br>Diferença entre Q1 e Q3: " + interQuantileRange +
                "<br>Minimo para outliers: " + min +
                "<br>Maximo para outliers: " + max)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Show median, min, and max lines
    svg.selectAll("medianLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", d => x(d.state) - 10)
        .attr("x2", d => x(d.state) + 10)
        .attr("y1", d => y(d.median))
        .attr("y2", d => y(d.median))
        .attr("stroke", "black");

    svg.selectAll("minLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.min))
        .attr("y2", d => y(d.q1))
        .attr("stroke", "black");

    svg.selectAll("maxLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.max))
        .attr("y2", d => y(d.q3))
        .attr("stroke", "black");

    //Adicionando rotulos no grafico
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", height + margin.bottom -5)
        .text("Estados");

    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 10)
        .text("Média Salarial (R$)");
});
*/

d3.csv("data/bloxpot_certo.csv", function(d) {
    var datacopia = d;
    for (let key in d) {
        if (d[key].trim() === "") {
            d[key] = NaN;  // Convert empty spaces to NaN
        } else {
            d[key + "_original"] = d[key]; // Preserve original string
            d[key] = parseFloat(d[key].replace(/\./g, '').replace(',', '.')); // Remove non-numeric characters and convert to number for calculations
        }
    }
    return d;
}).then(data => {
    // Parse data
    let states = Object.keys(data[0]).filter(key => !key.endsWith("_original"));
    let salaries = states.map(state => {
        return data.map(d => d[state]).filter(value => !isNaN(value));  // Filter out NaN values explicitly
    });

    console.log("Salaries after filtering NaN values:", salaries);
    const tooltip = d3.select("#tooltip");

    // Set dimensions and margins
    let margin = { top: 50, right: 30, bottom: 70, left: 70 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append SVG
    let svg = d3.select("#chart7 svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    let x = d3.scaleBand()
        .range([0, width])
        .domain(states)
        .paddingInner(1)
        .paddingOuter(.5);

    let y = d3.scaleLinear()
        .domain([0, d3.max(salaries.flat())])
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Compute summary statistics
    let sumstat = states.map((state, i) => {
        let stateData = salaries[i].sort(d3.ascending);
        //console.log(stateData)
        let q1 = d3.quantile(stateData, .25);
        
        let median = d3.quantile(stateData, .5);
        let q3 = d3.quantile(stateData, .75);
        let interQuantileRange = q3 - q1;
        let min = d3.min(stateData.filter(d => d >= q1 - 1.5 * interQuantileRange));
        let max = d3.max(stateData.filter(d => d <= q3 + 1.5 * interQuantileRange));
        let outliers = stateData.filter(d => d < min || d > max);
        return { state, q1, median, q3, interQuantileRange, min, max, outliers };
    });

    // Extração dos outliers
    let outliersData = [];
    sumstat.forEach(d => {
        d.outliers.forEach(outlier => {
            outliersData.push({ value: outlier, state: d.state });
        });
    });
    
    //let outl = sumstat.map(d => d.outliers);
    //console.log(outl)
    const formatBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    // Show the boxes
    svg.selectAll("boxes")
        .data(sumstat)
        .enter()
        .append("rect")
        .attr("x", d => x(d.state) - 10)
        .attr("y", d => y(d.q3))
        .attr("height", d => y(d.q1) - y(d.q3))
        .attr("width", 20)
        .attr("stroke", "black")
        .style("fill", "#2c697e")
        .on("mouseover", function(event, d) {
            
            var q1 = formatBR.format(sumstat[d].q1);
            var median = formatBR.format(sumstat[d].median);
            var q3 = formatBR.format(sumstat[d].q3);
            var interQuantileRange = formatBR.format(sumstat[d].interQuantileRange);
            var min = formatBR.format(sumstat[d].min);
            var max = formatBR.format(sumstat[d].max);
    
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Q1: " + q1 +
                "<br>Mediana: " + median +
                "<br>Q3: " + q3 +
                "<br>Diferença entre Q1 e Q3: " + interQuantileRange +
                "<br>Minimo para outliers: " + min +
                "<br>Maximo para outliers: " + max)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Show median lines
    svg.selectAll("medianLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", d => x(d.state) - 10)
        .attr("x2", d => x(d.state) + 10)
        .attr("y1", d => y(d.median))
        .attr("y2", d => y(d.median))
        .attr("stroke", "black");

    // Show min and max lines (whiskers)
    svg.selectAll("minLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.min))
        .attr("y2", d => y(d.q1))
        .attr("stroke", "black");

    svg.selectAll("maxLines")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", d => x(d.state))
        .attr("x2", d => x(d.state))
        .attr("y1", d => y(d.max))
        .attr("y2", d => y(d.q3))
        .attr("stroke", "black");

    // Show whiskers
    svg.selectAll("whiskerMin")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", d => x(d.state) - 5)
        .attr("x2", d => x(d.state) + 5)
        .attr("y1", d => y(d.min))
        .attr("y2", d => y(d.min))
        .attr("stroke", "black");

    svg.selectAll("whiskerMax")
        .data(sumstat)
        .enter()
        .append("line")
        .attr("x1", d => x(d.state) - 5)
        .attr("x2", d => x(d.state) + 5)
        .attr("y1", d => y(d.max))
        .attr("y2", d => y(d.max))
        .attr("stroke", "black");

    // Show outliers
    svg.selectAll("outliers")
        .data(outliersData)
        .enter()
        .append("circle")
        //.append("g")
        //.attr("transform", d => `translate(${x(d.state)},0)`)
        //.selectAll("circle")
        //.data(d => d.outliers.map(outlier => ({ value: outlier, state: d.state })))
        //.data(d => d.outliers)
        //.enter()
        //.append("circle")
        .attr("cx", d => x(d.state))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .style("fill", "red")
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("Outlier: " + formatBR.format(outliersData[d].value))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
        

    // Adicionando rotulos no grafico
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + width / 2)
        .attr("y", height + margin.bottom - 5)
        .text("Estados (Sul/Sudeste)");

    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 10)
        .text("Média Salarial (R$)");
});
