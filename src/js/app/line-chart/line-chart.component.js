'use strict';

var angular = require('angular');
var d3 = require('d3');

angular.
module('lineChart').
component('lineChart', {
  templateUrl: './app/line-chart/line-chart.template.html',
  bindings: {
    prices: "@",
    currency: "@"
  },
  controller: ['$element',
    function LineChartController($element) {

      var svg, margin, width, height, g;
      var parseTime;
      var x, y;
      var line;

      this.$onInit = function() {

        var svgWidth = 900;
        var svgHeight = 500;

        // Init line chart
        svg = d3.select($element[0]).append('svg').
                 attr("viewBox", "0 0 " + svgWidth + " " + svgHeight).
                 attr("preserveAspectRatio", "xMidYMid meet");
        margin = {top: 20, right: 20, bottom: 30, left: 50};
        width = svgWidth - margin.left - margin.right;
        height = svgHeight - margin.top - margin.bottom;
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        parseTime = d3.timeParse("%d %b %Y");

        x = d3.scaleTime().rangeRound([0, width]);
        y = d3.scaleLinear().rangeRound([height, 0]);

        line = d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.value); });

      }

      this.$onChanges = function(changes) {

        // render line chart
        if (changes.prices.currentValue) {
          var data = JSON.parse(changes.prices.currentValue);

          data.forEach(function(d) {
            d.date = new Date(d.date);
            d.value = +d.value;
          });

          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain(d3.extent(data, function(d) { return d.value; }));

          g.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x))
              .select(".domain")
              .remove();

          g.append("g")
              .call(d3.axisLeft(y))
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("text-anchor", "end")
              .text("Price (" + changes.currency.currentValue + ")");

          var path = g.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);

          // Line animation
          var totalLength = path.node().getTotalLength();
          path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1000)
            .attr("stroke-dashoffset", 0);

        };
      }
    }] 
});
