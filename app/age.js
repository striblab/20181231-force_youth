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
      
      self.chartCounts = c3.generate({
          bindto: self.target,
          padding: padding,
          data: {
                // x: 'x',
                columns: [
                    // ['2016', 0.05, 0.06, 0.06, 0.10, 0.20, 0.27, 0.23, 0.03],
                    ['Incidents', 0.016, 0.215758468,0.165491047,0.074645376,0.04046198,0.006007286,0.001007674,0.005]
                ],
            type: 'bar',
            labels: {
                format: {
                    'Incidents': d3.format('.0%')
                }
            }
          },
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

    }
  }
  
  export { ageChart as default }