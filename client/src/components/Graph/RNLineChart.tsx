import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import React from "react"

const App = ({ data }: any) => {

    const options = {

        credits: {
            enabled: false,
          },

        chart: {
            type: 'spline',
            height: '275px'
        },
        title: {
            text: ' '
        },
        subtitle: {
            // text: 'Source: ' +
            //     '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
            //     'target="_blank">Wikipedia.com</a>'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: 'NO of Tickets'
            },
            labels: {
                format: '{value}°'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: data
    }

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default App