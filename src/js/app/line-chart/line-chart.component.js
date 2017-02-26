'use strict';

var angular = require('angular');
var d3 = require('d3');

angular.
module('lineChart').
component('lineChart', {
  templateUrl: './app/line-chart/line-chart.template.html',
  bindings: {
    prices: "@"
  },
  controller: ['$element',
    function LineChartController($element) {

      var svg, margin, width, height;
      var parseDate, bisectDate, formatValue, formatCurrency
      var x, y;
      var line;

      function initChart() {

        var svgWidth = 900;
        var svgHeight = 500;        

        // Init line chart
        margin = {top: 20, right: 50, bottom: 30, left: 50};
        width = svgWidth - margin.left - margin.right;
        height = svgHeight - margin.top - margin.bottom;

        parseDate = d3.timeParse("%d-%b-%y"),
        bisectDate = d3.bisector(function(d) { return d.date; }).left,
        formatValue = d3.format(",.2f"),
        formatCurrency = function(d) { return formatValue(d); };

        x = d3.scaleTime().rangeRound([0, width]);
        y = d3.scaleLinear().rangeRound([height, 0]);

        line = d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.value); });

        svg = d3.select($element[0]).append("svg")
          .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight)
          .attr("preserveAspectRatio", "xMidYMid meet")
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

      function renderChart(data) {

          // Draw chart
          x.domain([data[0].date, data[data.length - 1].date]);
          y.domain(d3.extent(data, function(d) { return d.value; }));

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

          svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y))

          var path = svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);

          return path;
      }

      function animateChart(path) {
          // Line animation
          var totalLength = path.node().getTotalLength();
          path.attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1000)
            .attr("stroke-dashoffset", 0);
      }

      this.$onInit = function() {
        initChart();
      }

      this.$onChanges = function(changes) {

        if (changes.prices.currentValue) {
          var data = JSON.parse(changes.prices.currentValue);

          data.forEach(function(d) {
            d.date = new Date(d.date);
            d.value = +d.value;
          });

          var path = renderChart(data);
          animateChart(path);

          // tooltip
          var focus = svg.append("g")
              .attr("class", "focus")
              .style("display", "none");

          focus.append("circle")
              .attr("r", 4.5);

          focus.append("text")
              .attr("x", 9)
              .attr("dy", ".35em");

          svg.append("rect")
              .attr("class", "overlay")
              .attr("width", width)
              .attr("height", height)
              .on("mouseover", function() { focus.style("display", null); })
              .on("mouseout", function() { focus.style("display", "none"); })
              .on("mousemove", mousemove);

          function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                if(d) {
                  focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value) + ")");
                  focus.select("text").text(formatCurrency(d.value));
                }
          }
        };
      }
    }] 
});
