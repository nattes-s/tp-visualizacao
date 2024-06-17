window.selectedState = "Brasil";
window.filteredData = null;
window.dados = null;
d3.csv("data/cargo_final.csv", function(d) {
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
    const svg = d3.select("#chart8 svg"),
        margin = { top: 30, right: 300, bottom: 70, left: 200 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleBand().range([height, 0]).padding(0.1);

    const xAxis = chart.append("g")
        .attr("transform", `translate(0,${height})`);

    const yAxis = chart.append("g");

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

        xAxis.transition().call(d3.axisBottom(x));
        yAxis.transition().call(d3.axisLeft(y));

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
        //console.log(dados)
        
    
        
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
                          console.log(window.dados)
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

        const colors = {
            baixa: "#ff0000",
            alta: "#00ff00",
            muitoAlta: "#FFA500",
            naoEncontrado: "#808080"
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


