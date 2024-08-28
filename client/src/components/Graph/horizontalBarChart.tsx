import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertToInternationalCurrencySystem } from "../../Utils/index";

function getOption(
  title: any,
  subtitle: any,
  categories: any,
  series: any,
  heightValue: any
) {
  const option = {
    chart: {
      animation: false,
      type: "bar",
      spacingLeft: 10,
      // borderRadius: "25",
      height: heightValue ? heightValue : "60%",
    },
    colors: [
      '#00ff00',
      '#0000ff',
      '#ff0000',

  ],
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
      align: "center",
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
        return `${
          refThis.x + ": " + convertToInternationalCurrencySystem(refThis.y)
        }`;
      },
    },
    yAxis: {
      title: {
        text: "Count",
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
        dataLabels: {
          formatter: function (): any {
            let refThis: any = this;
            return convertToInternationalCurrencySystem(refThis.y);
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
          allowOverlap: true,
        },
      },
    },
    series: series,
  };
  return option;
}
const Graph = ({ payload, heightValue }: any) => {
  let option = getOption(
    payload.title,
    payload.subtitle,
    payload.categories,
    payload.series,
    heightValue
  );
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
