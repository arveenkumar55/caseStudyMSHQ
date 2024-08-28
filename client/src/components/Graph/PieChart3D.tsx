import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function getOption(payload: any, title: any, width: any) {
  const option = {
    chart: {
      animation: false,
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
      height: "60%",
    },

    credits: {
      enabled: false,
    },
    title: {
      text: title,
    },
    subtitle: {
      text: "",
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    series: [
      {
        name: "Delivered amount",
        data: [
          ["CA", 8],
          ["SA", 3],
          ["CORE SA", 1],
        ],
      },
    ],
  };
  return option;
}
const Graph = ({ payload, title, width }: any) => {
  let option = getOption(payload, title, width);
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
