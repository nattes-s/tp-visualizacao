/*
// map.js

// Defina as dimensões e margens do mapa
var width = 960,
    height = 600;

// Crie a projeção e o path
var projection = d3.geoMercator()
    .center([-55, -15])
    .scale(800)
    .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

// Crie o SVG
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

// Crie o tooltip
//var tooltip = d3.select("#tooltip");
var tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

// Carregue os dados e desenhe o mapa
d3.json("data/br-states.json").then(function(br) {
    d3.csv("data/mapa.csv").then(function(data) {
        var dataById = {};
        data.forEach(function(d) {
            dataById[d.estado] = d;
        });

        var colorScale = d3.scaleQuantize()
            .range(d3.schemeBlues[9]);

        // Função para atualizar o mapa de acordo com o filtro selecionado
        function updateMap(filter) {
            var valueExtent = d3.extent(data, function(d) { return +d[filter]; });
            colorScale.domain(valueExtent);
            
        svg.selectAll("path")
                .data(topojson.feature(br, br.objects.estados).features)
                .join("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    var stateData = dataById[d.id];
                    return stateData ? colorScale(stateData[filter]) : "#ccc";
                })
                .on("mouseover", function(event, d) {
                    var stateData = dataById[d.id];
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                   tooltip.html("Estado: " + d.properties + "<br/>" + filter + ": " + (stateData ? stateData[filter] : "N/A"))
                        .style("left", (event.pageX) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        }


            
           
        // Inicialize o mapa com o filtro padrão
        updateMap("media_salarial");

        // Atualize o mapa quando o filtro mudar
        d3.select("#filter").on("change", function() {
            updateMap(this.value);
        });
    });
});

*/

/*
// Defina as dimensões e margens do mapa
var width = 960,
    height = 600;

// Crie a projeção e o path
var projection = d3.geoMercator()
    .center([-55, -15])
    .scale(800)
    .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

// Selecione o SVG correto
var svg = svg = d3.select('.card__body__countries__map')
.append('svg')
.attr("viewBox", `0 0 ${width} ${height}`)

// Crie o tooltip
var tooltip = d3.select("#tooltip");

// Carregue os dados e desenhe o mapa
d3.json("data/br-states.json").then(function(br) {
    d3.csv("data/mapa.csv").then(function(data) {
        var dataById = {};
        data.forEach(function(d) {
            console.log(d);
            dataById[d.estado] = d;
             console.log(dataById);
        });

        var colorScale = d3.scaleQuantize()
            .range(d3.schemeBlues[9]);

        // Função para atualizar o mapa de acordo com o filtro selecionado
        function updateMap(filter) {

            var valueExtent = d3.extent(data, function(d) {
               // console.log(d);
                return +d[filter];
            });
            colorScale.domain(valueExtent);
            
            //  console.log(d[filter])
            //   console.log(valueExtent);
            svg.selectAll("path")
                .data(topojson.feature(br, br.objects.estados).features)
                .join("path")
                .attr("d", path)
                .attr("fill", function(d) {
                //    console.log(d);
                 //   console.log(dataById);
                    var stateData = dataById[d.id];
                   //  console.log(stateData);
                    return stateData ? colorScale(stateData[filter]) : "#2c697e";
                     
                })
                .on("mouseover", function(event, d) {
                  //  console.log(d);
                    var stateData = dataById[d.id];
                     // console.log(stateData);
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html("Estado: " + d.properties.name + "<br/>" + filter + ": " + (stateData ? stateData[filter] : "N/A"))
                        .style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on('mouseout', (event) => {
                        const countryTarget = event.target
                        if (!countryTarget.dataset.selected) {
                          d3.select(countryTarget).attr('class', 'country country-highlighted')
                        }
                        d3.select('.card__body__countries__tooltip')
                          .style('visibility','hidden')
                });
        }
        // Inicialize o mapa com o filtro padrão
        updateMap("media_salarial");

        // Atualize o mapa quando o filtro mudar
        d3.select("#filter").on("change", function() {
            updateMap(this.value);
            console.log(this.value);
        });
    });
});
*/

/*
var width = 960,
    height = 600;

// Crie a projeção e o path
var projection = d3.geoMercator()
    .center([-55, -15])
    .scale(800)
    .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

// Selecione o SVG correto
var svg = d3.select('.card__body__countries__map')
    .append('svg')
    .attr("viewBox", `0 0 ${width} ${height}`);

// Crie o tooltip
var tooltip = d3.select("#tooltip");

// Carregue os dados e desenhe o mapa
d3.json("data/br-states.json").then(function(br) {
    d3.csv("data/mapa.csv").then(function(data) {
        var dataById = {};
        data.forEach(function(d) {
            dataById[d.Estado] = d;
        });

        var colorScale = d3.scaleQuantize()
            .range(d3.schemeBlues[9]);

        // Função para atualizar o mapa de acordo com o filtro selecionado
        function updateMap(filter) {
            var valueExtent = d3.extent(data, function(d) {
                return +d[filter];
            });
            colorScale.domain(valueExtent);

            svg.selectAll("path")
                .data(topojson.feature(br, br.objects.estados).features)
                .join("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    var stateData = dataById[d.id];
                    return stateData ? colorScale(stateData[filter]) : "#2c697e";
                })
                .on("mouseover", function(event, d) {
                    var stateData = dataById[d.id];
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html("Estado: " + d.properties.nome + "<br/>" + filter + ": " + (stateData ? stateData[filter] : "N/A"))
                        .style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
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
*/

/*
var width = 960,
    height = 600;

// Crie a projeção e o path
var projection = d3.geoMercator()
    .center([-55, -15])
    .scale(800)
    .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

// Selecione o SVG correto
var svg = d3.select('.card__body__countries__map')
    .append('svg')
    .attr("viewBox", `0 0 ${width} ${height}`);

// Crie o tooltip
var tooltip = d3.select("#tooltip");

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

            svg.selectAll("path")
                .data(topojson.feature(br, br.objects.estados).features)
                .join("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    var stateData = dataById[d.id];
                    if (sulSudeste.includes(d.id)) {
                        return stateData ? colorScale(stateData[filter]) : "#2c697e";
                    } else {
                        return "#A9A9A9";
                    }
                })
                .on("mouseover", function(event, d) {
                    var stateData = dataById[d.id];
                    if (sulSudeste.includes(d.id)) {
                        d3.select(this).attr("fill", "orange");
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html("Estado: " + d.properties.nome + "<br/>" + filter + ": " + (stateData ? stateData[filter] : "N/A"))
                            .style("left", (event.pageX + 5) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    } else {
                        svg.selectAll("path")
                            .filter(function(d) { return !sulSudeste.includes(d.id); })
                            .attr("fill", "orange");
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html("Estado: Brasil" + "<br/>" + filter + ": " + (stateData ? stateData[filter] : "N/A"))
                            .style("left", (event.pageX + 5) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    }
                })
                .on("mouseout", function(d) {
                    svg.selectAll("path")
                        .attr("fill", function(d) {
                            var stateData = dataById[d.id];
                            if (sulSudeste.includes(d.id)) {
                                return stateData ? colorScale(stateData[filter]) : "#2c697e";
                            } else {
                                return "#A9A9A9";
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
*/

/*
var width = 960,
    height = 600;

// Crie a projeção e o path
var projection = d3.geoMercator()
    .center([-55, -15])
    .scale(800)
    .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

// Selecione o SVG correto
var svg = d3.select('.card__body__countries__map')
    .append('svg')
    .attr("viewBox", `0 0 ${width} ${height}`);

// Crie o tooltip
var tooltip = d3.select("#tooltip");

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
                    if (sulSudeste.includes(d.id)) {
                        d3.select(this).attr("fill", "#204d57");
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        var stateData = dataById[d.id];
                        tooltip.html("Estado: " + d.properties.nome + "<br/>" + filter + ": " + (stateData ? stateData[filter] : "N/A"))
                            .style("left", (event.pageX + 5) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    } else {
                        svg.selectAll("path")
                            .filter(function(d) { return !sulSudeste.includes(d.id); })
                            .attr("fill", "#204d57");
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html("Estado: Brasil" + "<br/>" + filter + ": " + (dataById["Brasil"] ? dataById["Brasil"][filter] : "N/A"))
                            .style("left", (event.pageX + 5) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    }
                })
                .on("mouseout", function() {
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
*/


var width = 960,
    height = 600;

// Crie a projeção e o path
var projection = d3.geoMercator()
    .center([-55, -15])
    .scale(800)
    .translate([width / 2, height / 2]);

var path = d3.geoPath().projection(projection);

// Selecione o SVG correto
var svg = d3.select('.card__body__countries__map')
    .append('svg')
    .attr("viewBox", `0 0 ${width} ${height}`);

// Crie o tooltip
var tooltip = d3.select("#tooltip");

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
            var chartTitleElement = document.getElementById("chart-title");
            if (filter === "Media_Salarial") {
                chartTitleElement.textContent = "Média salarial dos estados";
            } else if (filter === "Media_Amostras_Salario_Cargo") {
                chartTitleElement.textContent = "Média das amostras do salário por cargo";
            } else if (filter === "Diferenca_Relacao_Brasil_Porc") {
                chartTitleElement.textContent = "Diferença salarial de um estado em relação ao Brasil ";
            }

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
