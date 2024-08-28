import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function getOption1(payload: any, title: any, categories: any) {
  const option = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: 200,
      width: 190,
      animation: true,
    },
    title: {
      text: "Total Account",
      style: {
        fontSize: "12px",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },

    colors: ["rgb(255,0,0)", "rgb(112,173,71)"],

    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<span style="font-size:7px">{point.percentage:.1f} %<span>',
          connectorColor: "silver",
          distance: -10,
          color: "#fff",
          fontSize: "3px",
          size: "100",
        },
        showInLegend: true,
        stacking: "normal",
        startAngle: -90,
        endAngle: 90,
        center: ["46%", "100%"],
        size: "90%",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",

      itemStyle: {
        fontSize: "10px",
      },
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        innerSize: "50%",
        data: [
          ["ETB", 58.9],
          ["NTB", 13.29],
        ],
      },
    ],
  };

  return option;
}

type GraphPropsType = {
  option: any;
  payload: any;
  title: string;
  categories: any;
};

const Graph: React.FC<GraphPropsType> = ({
  option,
  payload,
  title,
  categories,
}) => {
  let options = getOption1(payload, title, categories);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Graph;
