
// Function to load mini charts in the dashboard
function loadMiniCharts() {

    //INÍCIO DO CHART 0
    d3.csv("data/coletados.csv").then(data => {
        const width = 210,
            height = 240,
            margin = 40;



        const radius = Math.min(width, height) / 2 - margin;

        const svg = d3.select("#chart9-preview .mini-chart svg")
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
            .style("font-size", 10)
            .style("fill", "black");

        const legend = svg.selectAll(".legend")
            .data(data_ready)
            .enter()
            .append("g")
            .attr("class", "legend")
            .style("font-size", 12)
            .attr("transform", (d, i) => `translate(80,${i * 20})`); // Ajuste da posição da legenda

        legend.append("rect")
            .attr("x", width / 2 - 18)
            .attr("width", 12)
            .attr("height", 12)
            .style("fill", d => color(d.data.key));

        legend.append("text")
            .attr("x", width / 2 - 30)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(d => d.data.key);
    });

    
    // FINAL DO CHART 0
    
    
    //INÍCIO DO CHART 1
    
    d3.csv("data/egresso1.csv").then(function(data) {
        var datacopia = data;
        var svg = d3.select("#chart1-preview .mini-chart svg"),
            
            
            margin = { top: 15, right: 30, bottom: 70, left: 70 },
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

        var tooltip = d3.select("#tooltip-chart1");
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
    // FINAL DO CHART 1


    //INÍCIO DO CHART 2
    function drawWordCloud(data) {
      var width = 300;
      var height = 200;


      var svg = d3.select("#chart2-preview .mini-chart svg")
          .attr("width", width)
          .attr("height", height);

      var layout = d3.layout.cloud()
          .size([width, height])
          .words(data.map(function(d) {
              return { text: d.termo, size: +d.frequencia * 7 };
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
    // FINAL DO CHART 2
    


    //INÍCIO DO CHART 3

    var width = 450,
        height = 200;

    // Crie a projeção e o path
    var projection = d3.geoMercator()
        .center([-55, -15])
        .scale(200)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath().projection(projection);

    // Selecione o SVG correto
    var svg = d3.select('.card__body__countries__map')
        .append('svg')
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Crie o tooltip
    var tooltip = d3.select("#tooltip-chart3");

    // Carregue os dados e desenhe o mapa
    d3.json("data/br-states.json").then(function(br) {
        d3.csv("data/mapa.csv").then(function(data) {
            var dataById = {};
            data.forEach(function(d) {
                dataById[d.Estado] = d;
            });

            var colorScale = d3.scaleQuantize()
                .range(d3.schemeBlues[9]);

            // Regiões Sul e Sudeste
            var sulSudeste = ["SP", "RJ", "MG", "ES", "PR", "SC", "RS"];

            // Função para atualizar o mapa de acordo com o filtro selecionado
            function updateMap(filter) {
                var valueExtent = d3.extent(data, function(d) {
                    return +d[filter];
                });
                colorScale.domain(valueExtent);

                const formatBR = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                // Atualize o título do gráfico
               /* var chartTitleElement = document.getElementById("chart-title");
                if (filter === "Media_Salarial") {
                    chartTitleElement.textContent = "Média salarial dos estados";
                } else if (filter === "Media_Amostras_Salario_Cargo") {
                    chartTitleElement.textContent = "Média das amostras do salário por cargo";
                } else if (filter === "Diferenca_Relacao_Brasil_Porc") {
                    chartTitleElement.textContent = "Diferença salarial de um estado em relação ao Brasil ";
                }*/

                svg.selectAll("path")
                    .data(topojson.feature(br, br.objects.estados).features)
                    .join("path")
                    .attr("d", path)
                    .attr("fill", function(d) {
                        if (sulSudeste.includes(d.id)) {
                            return "#2c697e";
                        } else {
                            return "#bbbbbb";
                        }
                    })
                    .on("mouseover", function(event, d) {
                        var stateData = dataById[d.id]
                        var diferenca = filter;

                        //para formatar os valores monetarios e decimais
                        var formatDecimal = d3.format(".2f");
                        var valorEstados = (stateData ? stateData[filter] : "N/A");
                        var valorBrasil = (dataById["Brasil"] ? dataById["Brasil"][filter] : "N/A");


                        if (diferenca == "Media_Salarial") {
                            diferenca = "Media Salarial";
                            valorEstados = formatBR.format(valorEstados);
                            valorBrasil = formatBR.format(valorBrasil);                     

                        }
                        else if (diferenca == "Media_Amostras_Salario_Cargo") {
                            diferenca = "Número de Amostras";

                        }
                        else if (diferenca == "Diferenca_Relacao_Brasil_Porc") {
                            diferenca = "Diferença Percentual";
                            valorEstados = formatDecimal(valorEstados) + "%";                     
                        }

                        console.log(diferenca)
                        if (sulSudeste.includes(d.id)) {
                            d3.select(this).attr("fill", "#204d57");
                            tooltip.transition()
                                .duration(200)
                                .style("opacity", .9);
                            tooltip.html("Estado: " + stateData.Estado + "<br/>" + diferenca + ": " + valorEstados)
                                .style("left", (event.pageX + 5) + "px")
                                .style("top", (event.pageY - 28) + "px");
                        } else {
                            svg.selectAll("path")
                                .filter(function(d) { return !sulSudeste.includes(d.id); })
                                .attr("fill", "#204d57");
                            tooltip.transition()
                                .duration(200)
                                .style("opacity", .9);
                            tooltip.html("Estado: Brasil" + "<br/>" + diferenca + ": " + valorBrasil)
                                .style("left", (event.pageX + 15) + "px")
                                .style("top", (event.pageY - 28) + "px");
                        }
                    })
                    .on("mouseout", function(event, d) {
                        svg.selectAll("path")
                            .attr("fill", function(d) {
                                if (sulSudeste.includes(d.id)) {
                                    return "#2c697e";
                                } else {
                                    return "#bbbbbb";
                                }
                            });
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });
            }

            // Inicialize o mapa com o filtro padrão
            updateMap("Media_Salarial");

            // Atualize o mapa quando o filtro mudar
            d3.select("#filter").on("change", function() {
                updateMap(this.value);
            });
        });
    });

    // FINAL DO CHART 3


    //INÍCIO DO CHART 4

    d3.csv('data/confianca3.csv').then(function(data) {
        var datacopia = data;
        const margin = {top: 40, right: 200, bottom: 70, left: 70},
              width = 450 - margin.left - margin.right,
              height = 200 - margin.top - margin.bottom;

        const svg = d3.select("#chart4-preview .mini-chart svg")
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
                .text("Estados (Sul/Sudeste)");

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

    // FINAL DO CHART 4
    
    //INÍCIO DO CHART 5

    d3.csv("data/scaterplot.csv").then(function(data) {
        var svg = d3.select("#chart5-preview .mini-chart svg"),
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
            .call(d3.axisBottom(x).tickFormat(d3.format("$.2f")))
            .selectAll("text") // Seleciona todos os rótulos de texto do eixo X
            .style("text-anchor", "end") // Define a âncora de texto para o final
            .attr("dx", "-.8em") // Ajusta a posição horizontal dos rótulos
            .attr("dy", ".15em") // Ajusta a posição vertical dos rótulos
            .attr("transform", "rotate(-45)"); // Rotaciona os rótulos em 45 graus;

          

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
            .attr("y", height + margin.top + 70)
            .text("Valor dos Salários (R$)");

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", margin.left - 50)
            .text("Estados (Sul/Sudeste)");

       
       
    });

    // FINAL DO CHART 5
    

    //INÍCIO DO CHART 6

    d3.csv("data/egresso1.csv").then(function(data) {
        var datacopia = data
        var svg = d3.select("#chart6-preview .mini-chart svg"),
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
            .call(d3.axisBottom(x).tickFormat(d3.format(".2f")))
            .selectAll("text") // Seleciona todos os rótulos de texto do eixo X
            .style("text-anchor", "end") // Define a âncora de texto para o final
            .attr("dx", "-.8em") // Ajusta a posição horizontal dos rótulos
            .attr("dy", ".15em") // Ajusta a posição vertical dos rótulos
            .attr("transform", "rotate(-45)"); // Rotaciona os rótulos em 45 graus;

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
            .attr("y", height + margin.top + 50)
            .text("Diferença em Relação Brasil (%)");

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", margin.left - 70)
            .text("Estados (Sul/Sudeste)");
    });

    // FINAL DO CHART 6

     //INÍCIO DO CHART 7
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
        const tooltip = d3.select("#tooltip-chart7");

        // Set dimensions and margins
        let margin = { top: 40, right: 200, bottom: 70, left: 70 },
            width = 450 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;


      
        // Append SVG
        let svg = d3.select("#chart7-preview .mini-chart svg")
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
            .attr("x", margin.left )
            .attr("y", height + margin.bottom - 10)
            .text("Estados (Sul/Sudeste)");

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 10)
            .text("Média Salarial (R$)");
    });

    // FINAL DO CHART 7

    //INICIO DO CHART 8
    window.selectedState = "Brasil";
    window.filteredData = null;
    window.dados = null;
    d3.csv("data/cargos4.csv", function(d) {
        for (let key in d) {
            if (d[key].trim() === "") {
                d[key] = NaN;
            } else {
                d[key + "_original"] = d[key];
                d[key] = parseFloat(d[key].replace(/\./g, '').replace(',', '.'));
            }
        }
        return d;
    }).then(data => {
        const svg = d3.select("#chart8-preview .mini-chart svg"),
           /* margin = { top: 10, right: 30, bottom: 30, left: 30 },
             margin = {top: 20, right: 100, bottom: 80, left: 80}
            width = 350 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;*/
            margin = { top: 10, right: 150, bottom: 70, left: 70 },
            width = 450 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        
        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleBand().range([height, 0]).padding(0.1);

        const xAxis = chart.append("g")
            .attr("transform", `translate(0,${height})` );
        
        const yAxis = chart.append("g");
        
        const yAxisLabelLimit = 5; // Limite de 10 caracteres

        // Use a função de formatação ao configurar o eixo Y
        yAxis.transition().call(d3.axisLeft(y).tickFormat(d => {
            // Verifique se o rótulo excede o limite de caracteres
            if (d.length > yAxisLabelLimit) {
                // Se exceder, abrevie o rótulo e adicione reticências
                return d.substring(0, yAxisLabelLimit) + "...";
            } else {
                // Caso contrário, mantenha o rótulo original
                return d;
            }
        }));
        
        const stateFilter = d3.select("#stateFilter");

        function updateData(selectedState) {
            //let window.filteredData;

            if (selectedState === "Brasil") {
                window.filteredData = data.map(d => ({
                    cargo: d.Cargo_original,
                    media: d.SalarioBrasil_mean_original,
                    mediana: d.SalarioBrasil_median_original,
                    totalRegistros: d.TotalRegistros_original,
                    amostras: d.AmostrasBrasil_mean_original,
                    confianca: {
                        baixa: d.ConfiancaBrasil_Baixa_original,
                        alta: d.ConfiancaBrasil_Alta_original,
                        muitoAlta: d.ConfiancaBrasil_MuitoAlta_original,
                        naoEncontrado: d.ConfiancaBrasil_naoEncontrado_original
                    }

                }));
                //console.log(window.filteredData);
            } else {
                window.filteredData = data.map(d => ({

                    cargo: d.Cargo_original,
                    media: d[`Salario${selectedState}_mean_original`],
                    mediana: d[`Salario${selectedState}_median_original`],
                    totalRegistros: d.TotalRegistros_original,
                    //totalRegistros: d[`TotalRegistros${selectedState}`],
                    amostras: d[`Amostras${selectedState}_mean_original`],
                    confianca: {
                        baixa: d[`Confianca${selectedState}_Baixa_original`],
                        alta: d[`Confianca${selectedState}_Alta_original`],
                        muitoAlta: d[`Confianca${selectedState}_MuitoAlta_original`],
                        naoEncontrado: d[`Confianca${selectedState}_NaoEncontrado_original`]
                    }


                }));
                console.log(window.filteredData);
            }
            // window.filteredData.sort((a, b) => a.media - b.media);
            return window.filteredData.filter(d => !isNaN(d.media));
        }
        //para formatar as casas decimais
        var formatDecimal = d3.format(".2f");
        //formatando os valores monetarios 
        const formatBR = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        function updateChart(filteredData, selectedState) {

            window.filteredData.forEach(d => d.selectedState = selectedState);
            window.filteredData.sort((a, b) => a.media - b.media);
            //console.log(window.filteredData)
            const maxMedia = window.filteredData.reduce((max, d) => Math.max(max, d.media), 0)
            x.domain([0, maxMedia * 1.1]); // Adiciona 10% ao valor máximo para margem

            y.domain(window.filteredData.map(d => d.cargo));

            xAxis.transition().call(d3.axisBottom(x).tickFormat(d3.format("$.2f")));
            xAxis.selectAll("text") // Seleciona todos os rótulos de texto do eixo X
            .style("text-anchor", "end") // Define a âncora de texto para o final
            .attr("dx", "-.8em") // Ajusta a posição horizontal dos rótulos
            .attr("dy", ".15em") // Ajusta a posição vertical dos rótulos
            .attr("transform", "rotate(-45)"); // Rotaciona os rótulos em 45 graus;
           // yAxis.transition().call(d3.axisLeft(y));
            // Aplica a formatação desejada nos rótulos do eixo y
            yAxis.transition().call(d3.axisLeft(y).tickFormat(d => d.replace(/_/g, ' ')));

            // Use a função de formatação ao configurar o eixo Y
            yAxis.transition().call(d3.axisLeft(y).tickFormat(d => {
                // Verifique se o rótulo excede o limite de caracteres
                if (d.length > yAxisLabelLimit) {
                    // Se exceder, abrevie o rótulo e adicione reticências
                    return d.substring(0, yAxisLabelLimit) + "...";
                } else {
                    // Caso contrário, mantenha o rótulo original
                    return d;
                }
            }));

            const xAxisLabel = chart.append("text")
                .attr("class", "x-axis-label")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("fill", "#000")
                .text("Média Salarial (R$)");

            const yAxisLabel = chart.append("text")
                .attr("class", "y-axis-label")
                .attr("x", -height / 2)
                .attr("y", -margin.left + 10)
                .attr("transform", "rotate(-90)")
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("fill", "#000")
                .text("Cargos");

            /*
            const bars = chart.selectAll(".bar")
                .data(window.filteredData, d => d.cargo);

            bars.enter().append("rect")
                .attr("class", "bar")
                .attr("x", 0)
                .attr("y", d => y(d.cargo))
                .attr("height", y.bandwidth())
                .attr("fill", "#2c697e")
                .merge(bars)
                .attr("width", d => x(d.media))
                .on("mouseover", function(event, d) {
                    const tooltip = d3.select("#tooltip");
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(
                        `Cargo: ${window.filteredData[d].cargo}<br>Total de Registros: ${window.filteredData[d].totalRegistros}<br>Estado: ${selectedState}<br>Média Salarial: ${window.filteredData[d].media}<br>Mediana do Salário: ${window.filteredData[d].mediana}<br>Número de Amostras: ${window.filteredData[d].amostras}<br>` +
                        `<svg width="150" height="150">
                            <g transform="translate(75,75)">
                                ${renderPieChart(window.filteredData[d].confianca)}
                            </g>
                        </svg>`
                    )
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    const tooltip = d3.select("#tooltip");
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .transition();

            // bars.exit().remove();
            */
            //console.log(window.filteredData)
            //console.log("dddddd" + window.selectedState)

            var constante = { selectedState: window.selectedState, filteredData: window.filteredData }


            window.dados = window.filteredData



            chart.selectAll(".bar")
                .data(constante.filteredData, d => d.cargo)
                .join(
                    enter => enter.append("rect")
                        .attr("class", "bar")
                        .attr("x", 0)
                        .attr("y", d => y(d.cargo))
                        .attr("height", y.bandwidth())
                        .attr("fill", "#2c697e")
                        .attr("width", d => x(d.media))
                        //.on("mouseover", mouseover)
                        //.on("mouseout", mouseleave),
                          .on("mouseover", function(event, d) {
                              const tooltip = d3.select("#tooltip");
                              //console.log(constante.filteredData)
                              //console.log(window.dados)
                              tooltip.transition()
                                  .duration(200)
                                  .style("opacity", .9);
                              tooltip.html(
                                  `Cargo: ${window.dados[d].cargo}<br>Total de Registros: ${Math.floor(window.dados[d].totalRegistros)}<br>Estado: ${window.selectedState}<br>Média Salarial: ${formatBR.format(window.dados[d].media)}<br>Mediana do Salário: ${formatBR.format(window.dados[d].mediana)}<br>Número de Amostras: ${formatDecimal(window.dados[d].amostras)}<br>` +
                                  `<svg width="150" height="150">
                                              <g transform="translate(75,75)">
                                                  ${renderPieChart(window.dados[d].confianca)}
                                              </g>
                                          </svg>`
                              )
                                  .style("left", (d3.event.pageX) + "px")
                                  .style("top", (d3.event.pageY - 28) + "px");
                          })
                          .on("mouseleave", function() {
                              const tooltip = d3.select("#tooltip");
                              tooltip.transition()
                                  .duration(500)
                                  .style("opacity", 0);
                          }),
                    update => update.transition()
                        .attr("width", d => x(d.media))
                        .attr("y", d => y(d.cargo)),
                    exit => exit.remove()
                );


            chart.selectAll(".median-point")
                .data(window.filteredData, d => d.cargo)
                .join(
                    enter => enter.append("circle")
                        .attr("class", "median-point")
                        .attr("cx", d => x(d.mediana))
                        .attr("cy", d => y(d.cargo) + y.bandwidth() / 2)
                        .attr("r", 4)
                        .attr("fill", "red"),
                    update => update.transition()
                        .attr("cx", d => x(d.mediana))
                        .attr("cy", d => y(d.cargo) + y.bandwidth() / 2),
                    exit => exit.remove()
                );

            const medianLineData = window.filteredData.filter(d => !isNaN(d.mediana));

            chart.selectAll(".median-line")
                .data([medianLineData])
                .join(
                    enter => enter.append("path")
                        .attr("class", "median-line")
                        .attr("fill", "none")
                        .attr("stroke", "red")
                        .attr("stroke-width", 2)
                        .attr("d", d3.line()
                            .x(d => x(d.mediana))
                            .y(d => y(d.cargo) + y.bandwidth() / 2)
                            .curve(d3.curveMonotoneX)(medianLineData)
                        ),
                    update => update.transition()
                        .attr("d", d3.line()
                            .x(d => x(d.mediana))
                            .y(d => y(d.cargo) + y.bandwidth() / 2)
                            .curve(d3.curveMonotoneX)(medianLineData)
                        ),
                    exit => exit.remove()
                );

            /*  const medianPoints = chart.selectAll(".median-point")
                  .data(window.filteredData, d => d.cargo);

              medianPoints.enter().append("circle")
                  .attr("class", "median-point")
                  .attr("cx", d => x(d.mediana))
                  .attr("cy", d => y(d.cargo) + y.bandwidth() / 2)
                  .attr("r", 4)
                  .attr("fill", "red")
                  .merge(medianPoints);

              medianPoints.transition()
                  .attr("cx", d => x(d.mediana))
                  .attr("cy", d => y(d.cargo) + y.bandwidth() / 2);

              medianPoints.exit().remove();

              const medianLineData = window.filteredData.filter(d => !isNaN(d.mediana));

              const medianLine = chart.selectAll(".median-line")
                  .data([medianLineData]);

              medianLine.enter().append("path")
                  .attr("class", "median-line")
                  .attr("fill", "none")
                  .attr("stroke", "red")
                  .attr("stroke-width", 2)
                  .merge(medianLine)
                  .transition()
                  .attr("d", d3.line()
                      .x(d => x(d.mediana))
                      .y(d => y(d.cargo) + y.bandwidth() / 2)
                      .curve(d3.curveMonotoneX)(medianLineData)
                  );

              medianLine.exit().remove();*/
        }

        function renderPieChart(confianca) {
            const filteredConfianca = Object.keys(confianca)
                .filter(key => confianca[key] > 0)
                .reduce((obj, key) => {
                    obj[key] = confianca[key];
                    return obj;
                }, {});

            const pie = d3.pie().value(d => d.value);
            const dataReady = pie(d3.entries(filteredConfianca));

            const arc = d3.arc()
                .innerRadius(30)
                .outerRadius(50);

            /*const colors = {
                baixa: "#ff0000",
                alta: "#00ff00",
                muitoAlta: "#FFA500",
                naoEncontrado: "#808080"
            };*/

            const colors = {
                baixa: "#ff4c4c",
                alta: "#4caf50",
                muitoAlta: "#ffca28",
                naoEncontrado: "#9e9e9e"
            };

            const arcs = dataReady.map(d => `
                <path d="${arc(d)}" fill="${colors[d.data.key]}"></path>
            `).join("");

            const labels = dataReady.map(d => `
                <text transform="translate(${arc.centroid(d)})" dy=".35em" text-anchor="middle" font-weight="bold">
                    ${d.data.value}
                </text>
            `).join("");

            const legend = Object.keys(colors).filter(key => filteredConfianca[key] > 0).map((key, index) => `
                <g transform="translate(0,${index * 20})">
                    <rect width="10" height="10" fill="${colors[key]}"></rect>
                    <text x="15" y="10" font>${{
                    baixa: "Baixa",
                    alta: "Alta",
                    muitoAlta: "Muito Alta",
                    naoEncontrado: "N.E."
                }[key]}</text>
                </g>
            `).join("");

            return `
                <text x="0" y="-60" text-anchor="middle" font-size="14px" font-weight="bold">Confiança dos dados</text>
            <g transform="translate(-25,-5)">
                ${arcs + labels}
            </g>
            <g transform="translate(30,-40)">
                ${legend}
            </g>
            `;
        }

        stateFilter.on("change", function() {

            window.selectedState = d3.select(this).property("value");
            window.filteredData = updateData(window.selectedState);
            //console.log("dddddd" + selectedState)
            updateChart(window.filteredData, window.selectedState);
        });

        const initialData = updateData("Brasil");
        updateChart(initialData, "Brasil");
    });

    //FINAL DO CHART 8

    // Event listeners for expanding charts
    d3.select("#chart1-preview").on("click", () => window.location.href = "chart1.html");
    d3.select("#chart2-preview").on("click", () => window.location.href = "chart2.html");
    d3.select("#chart3-preview").on("click", () => window.location.href = "chart3.html");
    d3.select("#chart4-preview").on("click", () => window.location.href = "chart4.html");
    d3.select("#chart5-preview").on("click", () => window.location.href = "chart5.html");
    d3.select("#chart6-preview").on("click", () => window.location.href = "chart6.html");
    d3.select("#chart7-preview").on("click", () => window.location.href = "chart7.html");
    d3.select("#chart8-preview").on("click", () => window.location.href = "chart8.html");
    d3.select("#chart9-preview").on("click", () => window.location.href = "chart9.html");
}

// Load mini charts when the page loads
document.addEventListener("DOMContentLoaded", loadMiniCharts);
