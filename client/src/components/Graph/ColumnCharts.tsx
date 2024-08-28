import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertToInternationalCurrencySystem } from "../../Utils/index";

function getOption(payload: any, widthValue: any, heightValue: any) {
  const option = {
    colors: ["rgb(68,114,196)", "rgb(255,192,0)", "rgb(237, 125, 17)"],
    chart: {
      type: "column",
      inverted: true,
      polar: true,
    },
    title: {
      text: "",
    },
    tooltip: {
      outside: true,
    },
    pane: {
      size: "85%",
      innerSize: "20%",
      endAngle: 270,
    },
    xAxis: {
      tickInterval: 1,
      labels: {
        align: "right",
        useHTML: true,
        allowOverlap: true,
        step: 1,
        y: 3,
        style: {
          fontSize: "13px",
        },
      },
      lineWidth: 0,
      categories: payload.categories,
    },
    yAxis: {
      crosshair: {
        enabled: true,
        color: "#333",
      },
      lineWidth: 0,
      tickInterval: 25,
      reversedStacks: false,
      endOnTick: true,
      showLastLabel: true,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0.15,
      },
    },
    series: payload.series,
  };
  return option;
}
const Graph = ({ payload, heightValue, widthValue }: any) => {
  let option = getOption(payload, widthValue, heightValue);
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
