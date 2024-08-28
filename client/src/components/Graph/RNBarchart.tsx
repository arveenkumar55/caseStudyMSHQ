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
        fontSize: "14px",
        // fontWeight: "bold",
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
    // legend: {
    //   enabled: true,
    //   layout: "horizontal",
    //   align: "right",
    //   verticalAlign: "bottom",
    //   itemStyle: {
    //     fontSize: "9px",
    //   },
    // },
    xAxis: {
      categories: categories,
      crosshair: true,
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
