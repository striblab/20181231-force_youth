import * as d3 from 'd3';
import * as c3 from 'c3';

class Chart {

    constructor(target) {
        this.target = target;
        this.chartCounts = null;
    }

    render() {
        var self = this;

        var padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 60,
        };

        self.chartCounts = c3.generate({
            bindto: self.target,
            padding: padding,
            data: {
                xs: {
                    '16-24': 'x',
                    '25-34': 'x'
                },
                columns: [
                    ['x', 2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
                    ['16-24', 0.241904762,0.243145743,0.2752443,0.259382819,0.2426405,0.222339305,0.23358349,0.224660397,0.227360308,0.207708779,0.168704156,null,null],
                    ['25-34', 0.161904762,0.168831169,0.160423453,0.170975813,0.168599465,0.179135933,0.177298311,0.167189133,0.179190751,0.17130621,0.149144254,null,null]
                    // ['16-24', 0.424342105,0.401335762,0.469979296,0.444444444,0.417702999,0.391801716,0.38172043,0.422382671,0.378472222,0.363538296,0.341145833,null,null],
                    // ['25-34', 0.293859649,0.315725562,0.305037957,0.26962963,0.295537674,0.336510963,0.36328725,0.310469314,0.338541667,0.335490831,0.346354167,null,null]
                ],
                type: 'line',
                line: {
                    connectNull: true
                }
            },
            legend: {
                show: false
            },
            line: {
                connectNull: true
            },
            point: {
                show: true,
                r: function(d) {
                    if (d.x == 2018) {
                        return 6;
                    } else {
                        return 3;
                    }
                }
            },
            color: {
                pattern: ['#3580A3','#A7E6E3']
            },
            axis: {
                // rotated: true,
                y: {
                    max: 1,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0, 0.25, 0.50, 0.75, 1],
                        format: d3.format('.0%')
                    }
                },
                x: {
                    padding: {
                        right: 0,
                        left: 0
                    },
                    tick: {
                        // rotate: -75,
                        multiline: false,
                        // values: [1950, 1958, 1966, 1974, 1982, 1990, 1998, 2006, 2014, 2018, 2022]
                    },
                    // height: 40
                }
            },
            grid: {
                focus: {
                    show: false
                },
                y: {
                    lines: [{
                        value: 0.5,
                        text: '',
                        position: 'start',
                        class: 'powerline'
                    }]

                }
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                    return '<div class="chart-tooltip gray3">' + d[0].x + '</div><div class="chart-tooltip blue4"><span class="tooltip-label">Blacks 16-24:</span>' +
                        '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div><div class="chart-tooltip blue2"><span class="tooltip-label">Blacks 25-34:</span>' +
                        '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span></div>'
                }
            }
        });

    }
}

export {
    Chart as
    default
}