import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function getOption1(payload: any, title: any, categories: any) {
  const option = {
    chart: {
      animation: false,
      type: "column",
      width: 250,
      height: 300,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "18px",
            fontWeight: "lighter",
          },
          allowOverlap: true,
          // pointPadding: 0.7,
        },
      },
    },
    yAxis: {
      labels: {
        formatter: function (): any {
          let refThis: any = this;
          return Math.abs(refThis.value) + "M";
        },
      },
    },

    tooltip: {
      pointFormat: "{series.name}: {point.y}M",
      // formatter: function() {
      //     return `${this.x}: ${this.y}`

      // }
    },
    title: {
      text: title,
      style: {
        fontSize: "12px",
      },
    },
    xAxis: {
      categories: categories,
    },
    credits: {
      enabled: false,
    },
    series: payload,
  };

  return option;
}

function getOption2(payload: any, title: any, categories: any) {
  const option = {
    chart: {
      animation: false,
      type: "column",
      width: 250,
      height: 300,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "18px",
            fontWeight: "lighter",
          },
          allowOverlap: true,
          // pointPadding: 0.7,
        },
      },
    },
    yAxis: {
      labels: {
        formatter: function (): any {
          let thisRef: any = this;
          return Math.abs(thisRef.value);
        },
      },
    },
    title: {
      text: title,
      style: {
        fontSize: "12px",
      },
    },
    xAxis: {
      categories: categories,
    },
    credits: {
      enabled: false,
    },
    series: payload,
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
  let options = null;
  if (option === "option1") {
    options = getOption1(payload, title, categories);
  } else {
    options = getOption2(payload, title, categories);
  }
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Graph;
