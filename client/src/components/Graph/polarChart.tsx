import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertToInternationalCurrencySystem } from "../../Utils/index";

function getOption(payload: any, width: any, height: any) {
  const option = {
    colors: ["#FFD700", "#C0C0C0", "#CD7F32"],
    chart: {
      animation: false,
      type: "column",
      inverted: true,
      polar: true,
      width: width,
      height: height,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    tooltip: {
      outside: true,
      formatter: function (): any {
        let refThis: any = this;
        return `${
          refThis.x + ": " + convertToInternationalCurrencySystem(refThis.y)
        }`;
      },
    },
    pane: {
      size: "50%",
      innerSize: "10%",
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
      categories: ["Actual", "Base"],
    },
    yAxis: {
      crosshair: {
        enabled: true,
        color: "#333",
      },
      labels: {
        formatter: function (): any {
          let refThis: any = this;
          return convertToInternationalCurrencySystem(refThis.value);
        },
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
        groupPadding: 0.1,
      },
    },
    series: [
      {
        name: "CA",
        data: [30000000, 30000000],
      },
      {
        name: "SA",
        data: [30000000, 30000000],
      },
      {
        name: "Total",
        data: [60000000, 60000000],
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
