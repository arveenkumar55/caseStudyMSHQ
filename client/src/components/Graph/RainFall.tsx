import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertToInternationalCurrencySystem } from "../../Utils/index";

function getOption(
  title: any,
  subtitle: any,
  categories: any,
  payload: any,
  heightValue: any
) {
  const option = {
    chart: {
      animation: false,
      zoomType: "xy",
      height: heightValue ? heightValue : "60%",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: [
      {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Secondary yAxis
        title: {
          text: "Deposit (Vol)",
          style: {
            color: "black",
          },
        },
        labels: {
          formatter: function (): any {
            let refThis: any = this;
            return convertToInternationalCurrencySystem(refThis.value);
          },
          style: {
            color: "black",
          },
        },
        opposite: true,
      },
      {
        // Primary yAxis
        labels: {
          formatter: function (): any {
            let refThis: any = this;
            return convertToInternationalCurrencySystem(refThis.value);
          },
          style: {
            color: "blue",
          },
        },
        title: {
          text: "NoR",
          style: {
            color: "blue",
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      // formatter: function():any {
      //     let refThis:any = this
      //     console.log('refThis', refThis)
      //     return `${refThis.x + ": "+ convertToInternationalCurrencySystem(refThis.y)}`

      // }
    },
    legend: {
      layout: "vertical",
      align: "left",
      x: 120,
      verticalAlign: "top",
      y: -15,
      floating: true,
      backgroundColor: "rgba(255,255,255,0.25)",
    },
    series: [
      {
        name: "NoR",
        type: "column",
        yAxis: 1,
        data: payload.accountPayload,
        // tooltip: {
        //     valueSuffix: ' mm'
        // }
      },
      {
        name: "Deposit (Vol)",
        type: "spline",
        data: payload.balancePayload,
        // tooltip: {
        //     valueSuffix: '°C'
        // }
      },
    ],
  };
  return option;
}
const Graph = ({ payload, heightValue }: any) => {
  let option = getOption(
    payload.title,
    payload.subtitle,
    payload.categories,
    payload,
    heightValue
  );
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
