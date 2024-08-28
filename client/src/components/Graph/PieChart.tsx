import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertToInternationalCurrencySystem } from "../../Utils/index";

function getOption(payload: any, width: any, height: any) {
  const option = {
    credits: {
      enabled: false,
    },
    // colors : ['#5fea94', '#f6984b'],
    chart: {
      animation: true,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      // width: width ? width: 250,
      height: height ? height : 200,
    },
    title: {
      text: payload.title,
      style: {
        fontSize: "14px",
      },
    },
    colors: payload.colors ? payload.colors : ["#005d5d", "#a2191f", "#ffa600"],
    // colors: ['rgb(237,125,49)', 'rgb(68,114,196)', '#ffa600'],
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      outside: true,
      // formatter: function():any {
      //     let refThis:any = this

      //     console.log('refThis', refThis)

      // }
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    legend: {
      itemStyle: {
        fontSize: "10px",
      },

      // style : {
      //     fontSize:"9px"
      // },
      labelFormatter: function (): any {
        let refThis: any = this;

        return `${refThis.name}`;
      },
      fontSize: "9px",
      // align: 'right',
      // verticalAlign: 'top',
      // layout: 'vertical',
      // x: 0,
      // y: 100
    },
    plotOptions: {
      pie: {
        colors: [
          "#DC3911",
          "#007ED5",
          "#0A9D58",
          "#7CDDDD",
          "#52D726",
          "#FFEC00",
          "#FF7200",
          "#DC3911",
          "#FF0000",
        ],
        size: width ? width : "150",
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.y} ({point.percentage:.1f} %)",
          connectorColor: "silver",
          distance: -40,
          color: "white",
          style: {
            fontSize: "9px",
          },
        },
        showInLegend: true,
        stacking: "normal",
      },
    },
    series: payload.seriesData,
  };
  return option;
}
const Graph = ({ payload, width, height }: any) => {
  let option = getOption(payload, width, height);
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
