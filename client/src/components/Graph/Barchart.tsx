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
      animation: true,
      type: "column",
      spacingLeft: -5,
      // borderRadius: "25",
      height: heightValue ? heightValue : "60%",
    },
    title: {
      text: title,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: subtitle,
      style: {
        fontSize: "8px",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
      layout: "horizontal",
      align: "right",
      verticalAlign: "bottom",
      itemStyle: {
        fontSize: "9px",
      },
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    tooltip: {
      formatter: function (): any {
        let refThis: any = this;

        var pcnt =
          (refThis.y /
            series
              .map((row: any) => row.data[0].y)
              .reduce((a: any, b: any) => a + b, 0)) *
          100;

        if (pcnt) {
          return `${
            refThis.x +
            ": " +
            pcnt.toLocaleString("en-US", { maximumFractionDigits: 1 }) +
            " %"
          }`;
        } else {
          return `<span>${
            refThis.x + ": " + convertToInternationalCurrencySystem(refThis.y)
          }</span>`;
        }
      },
    },
    yAxis: {
      title: {
        text: yTitle ? yTitle : "Count",
      },
      labels: {
        formatter: function (): any {
          let refThis: any = this;
          return convertToInternationalCurrencySystem(refThis.value);
        },
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 1,
        colorByPoint: true,
        colors: colors ? colors : ["#0F9D58", "#4285F4", "#F4B400", "#DB4437"],
        dataLabels: {
          formatter: function (): any {
            let refThis: any = this;
            return yTitle === "Percentage"
              ? convertToInternationalCurrencySystem(refThis.y) + "%"
              : convertToInternationalCurrencySystem(refThis.y);
          },
          // formatter: function(value:any, context:any) {
          //   console.log('context.chart.data.labels[context.dataIndex]', context.chart.data.labels[context.dataIndex])
          //   return  convertToInternationalCurrencySystem(context.chart.data.labels[context.dataIndex]);
          // },
          enabled: true,
          style: {
            fontSize: "12px",
            fontWeight: "lighter",
          },
          allowOverlap: false,
        },
      },
    },
    series: series,
  };
  return option;
}
const Graph = ({ payload, heightValue }: any) => {
  // console.log(' payload.colors',  payload.colors)
  let option = getOption(
    payload.title,
    payload.subtitle,
    payload.categories,
    payload.series,
    heightValue,
    payload.yTitle,
    payload.colors
  );
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
