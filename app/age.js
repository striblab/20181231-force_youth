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
        
      var black = ['Incidents', 0.025247409,0.239460765,0.164575703,0.074729214,0.042858256,0.000701317,0.000758725,0.011065222];
      var white = ['Incidents', 0.001402634,0.074027897,0.078313722,0.033507364,0.021974597,0.007169017,0.001402634,0.002493571];

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