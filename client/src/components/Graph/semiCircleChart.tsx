import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function getOption(payload: any, width: any, height: any) {
  const option = {
    credits: {
      enabled: false,
    },

    chart: {
      animation: false,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      // width: width ? width: 250,
      height: height ? height : 200,
    },
    title: {
      text: payload.title,
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        colors: ["#4285F4", "#DB4437"],
        dataLabels: {
          enabled: true,
          distance: -10,
          style: {
            fontWeight: "bold",
            color: "#000",
          },
          connectorColor: "silver",

          format: "{point.percentage:.1f} %",
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "80%"],
        size: "100%",
        showInLegend: true,
      },
    },
    series: [
      {
        type: "pie",
        name: "share",
        innerSize: "50%",
        data: payload.series,
      },
    ],
  };
  return option;
}
const Graph = ({ payload, width, height }: any) => {
  let option = getOption(payload, width, height);
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
