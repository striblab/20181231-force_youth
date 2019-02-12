import * as d3 from 'd3';
import * as c3 from 'c3';

class ageChart { 

    constructor(target) {
      this.target = target;
      this.chartCounts = null;
    }
  
    render() {
      var self = this;
  
      var  padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 60,
        };
        
      var black = ['Incidents', 0.022930366,0.237143821,0.169111448,0.078907436,0.045860732,0.007334345,0.000758725,0.00927331];
      var white = ['Incidents', 0.001433148,0.071825999,0.080256281,0.034817063,0.023267577,0.007502951,0.001517451,0.001264542];

      var dataset = black;
      var chartTitle = "Force against black individuals";

      if (self.target == '#chartAgeW') { 
          dataset = white; 
          chartTitle = "Force against white individuals";
      }
      
      self.chartCounts = c3.generate({
          bindto: self.target,
          padding: padding,
          data: {
                columns: [
                    dataset
                ],
            type: 'area',
            labels: {
                format: {
                    'Incidents': d3.format('.0%')
                }
            }
          },
        //   title: {
        //     text: chartTitle
        //   },
            tooltip: {
                show: false
            },
            legend: {
              show: false
            },
            point: {
                show: true,
                r: function(d) { if (d.x == 2018) { return 6;} else { return 0; } }
            },
            color: {
                pattern: ['#3580A3']
            },
            axis: {
                  rotated: true,
                  y: {
                        show: false,
                        max: 1,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 4,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('.0%')
                        }
                    },
                x: {
                  type: 'category',
                  categories: ['Age 6-15','Age 16-24','Age 25-34','Age 35-44','Age 45-54','Age 55-64','Age 65+','Unknown'],
                  padding: {right: 0, left: 0},
                        tick: {
                         rotate: -75,
                         multiline: false
                        },
                        height: 40
                }
            }
    });
  
    d3.selectAll(".c3-target-2018")
    .selectAll(".c3-bar, .c3-texts")
    .attr("transform", "translate(0, 2)");

    $(self.target).append("<div class='chartLabel'>" + chartTitle + "</div>");

    }
  }
  
  export { ageChart as default }