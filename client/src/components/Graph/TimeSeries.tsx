import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { convertToInternationalCurrencySystem } from "../../Utils/index";

// function arrayMin(array:any) {

//     let value = array?.length > 0 ? array[0][1] : 0
//     for (let i = 1; i < array?.length; i++) {
//       if (array[i][1] < value) {
//         value = array[i][1];
//       }
//     }

//     return value
//   }

function getOption1(payload: any, heightValue: any, graphfooterName: any) {
  const option = {
    chart: {
      animation: false,
      type: "spline",
      zoomType: "x",
      height: heightValue ? heightValue : "70%",
    },
    title: {
      text: payload.title,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: payload.subtitle,
      style: {
        fontSize: "8px",
      },
    },
    credits: {
      enabled: false,
    },

    tooltip: {
      formatter: function (): any {
        let refThis: any = this;
        return `${
          refThis.x + ": " + convertToInternationalCurrencySystem(refThis.y)
        }`;
      },
    },
    xAxis: {
      categories: payload.categories,
      // categories: [
      //     'Jan',
      //     'June',
      //     'December'
      //   ],
      // type: 'datetime',
      /*         dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b'
    }, */
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Value",
      },
      min: payload.minValue,
    },
    // tooltip: {
    //     headerFormat: '<b>{series.name}</b><br>',
    //     pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    // },

    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },

    colors: ["#6CF", "#39F", "#06C", "#036", "#000"],

    series: [
      {
        color: "#6CF",
        name: `${graphfooterName}-Balance`,
        data: payload.series,
      },
      {
        color: "#000",
        name: `${graphfooterName}-Base`,
        data: payload.base,
      },
    ],

    // responsive: {
    //     rules: [{
    //         condition: {
    //             maxWidth: 500
    //         },
    //         chartOptions: {
    //             plotOptions: {
    //                 series: {
    //                     marker: {
    //                         radius: 2.5
    //                     }
    //                 }
    //             }
    //         }
    //     }]
    // }
  };
  return option;
}

function getOption2(payload: any, heightValue: any, graphfooterName: any) {
  const option = {
    chart: {
      animation: false,
      type: "spline",
      zoomType: "x",
      height: heightValue ? heightValue : "70%",
    },
    title: {
      text: payload.title,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: payload.subtitle,
      style: {
        fontSize: "8px",
      },
    },
    credits: {
      enabled: false,
    },

    tooltip: {
      formatter: function (): any {
        let refThis: any = this;
        return `${
          refThis.x + ": " + convertToInternationalCurrencySystem(refThis.y)
        }`;
      },
    },
    xAxis: {
      categories: payload.categories,
      // categories: [
      //     'Jan',
      //     'June',
      //     'December'
      //   ],
      // type: 'datetime',
      /*         dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b',
          year: '%b'
      }, */
      title: {
        text: "",
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      min: payload.minValue,
    },
    // tooltip: {
    //     headerFormat: '<b>{series.name}</b><br>',
    //     pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    // },

    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },

    colors: ["#6CF", "#39F", "#06C", "#036", "#000"],

    series: [
      {
        color: "#6CF",
        name: `${graphfooterName}`,
        data: payload.series,
      },
    ],

    // responsive: {
    //     rules: [{
    //         condition: {
    //             maxWidth: 500
    //         },
    //         chartOptions: {
    //             plotOptions: {
    //                 series: {
    //                     marker: {
    //                         radius: 2.5
    //                     }
    //                 }
    //             }
    //         }
    //     }]
    // }
  };
  return option;
}
const Graph = ({
  payload,
  heightValue,
  graphfooterName,
  isSingleSeries,
}: any) => {
  let option = {};
  if (isSingleSeries) {
    option = getOption2(payload, heightValue, graphfooterName);
  } else {
    option = getOption1(payload, heightValue, graphfooterName);
  }

  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default Graph;
