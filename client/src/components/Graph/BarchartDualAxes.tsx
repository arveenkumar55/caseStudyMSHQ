import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertToInternationalCurrencySystem } from "../../Utils/index";

function getOption(
  title: any,
  subtitle: any,
  categories: any,
  series: any,
  heightValue: any,
  yTitle: any,
  colors: any
) {
  const option = {
    chart: {
      zoomType: 'xy'
  },
  title: {
      text: '',
      align: 'center'
  },
  // subtitle: {
  //     text: 'Source: ' +
  //         '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
  //         'target="_blank">YR</a>'
  // },
  xAxis: [{
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
  }],
  yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}',
          style: {
              color: "rgb(84, 79, 197)"
          }
      },
      title: {
          text: 'Accounts',
          style: {
              color: "rgb(84, 79, 197)"
          }
      }
  }, { // Secondary yAxis
      title: {
          text: 'Balance',
          style: {
              color: "rgb(44, 175, 254)"
          }
      },
      labels: {
        formatter: function (): any {
          let refThis: any = this;
          return convertToInternationalCurrencySystem(refThis.value) + ' PKR';
        },
          style: {
              color: "rgb(44, 175, 254)"
          }
      },
      opposite: true
  }],
  tooltip: {
      shared: true,
      formatter: function (): any {
        let refThis: any = this;

        console.log('refThis.points[0]', refThis.points[0])
        return `<span>  Month : ${
          refThis.x + " <br>" + refThis.points[0].series.name + " : "+convertToInternationalCurrencySystem(refThis.points[0].y) + " <br>" + refThis.points[1].series.name + " : "+convertToInternationalCurrencySystem(refThis.points[1].y)
        }</span>`;
      }
  },
  legend: {
      align: 'left',
      x: 80,
      verticalAlign: 'top',
      y: 80,
      floating: true,
      backgroundColor:
          'rgba(255,255,255,0.25)'
  },
  series: [{
      name: 'Balance',
      type: 'column',
      yAxis: 1,
      data: [300000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000, 4500000,
          6000000, 6500000, 6900000],
      tooltip: {
          valueSuffix: ' PKR'
      }

  }, {
      name: 'Account',
      type: 'spline',
      data: [100,200,300,100,500,150,700,800,900,1000,100,1200],
      tooltip: {
          valueSuffix: ''
      }
  }]
  };
  return option;
}
const Graph = ({ payload, heightValue }: any) => {
  // console.log(' payload.colors',  payload.colors)
  let option = getOption(
    payload?.title,
    payload?.subtitle,
    payload?.categories,
    payload?.series,
    heightValue,
    payload?.yTitle,
    payload?.colors
  );
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
