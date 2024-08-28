import React from "react";
import styled, { withTheme } from "styled-components/macro";

import { orange, red } from "@material-ui/core/colors";

import { Card as MuiCard, CardContent, Typography } from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Doughnut } from "react-chartjs-2";

import { convertToInternationalCurrencySystem } from "../../Utils/index";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  position: relative;
`;

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 40%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`;

const DoughnutChart = ({ theme, payload, height, cutoutPercentage }: any) => {
  const data = {
    labels: payload && payload.labels,
    datasets: [
      {
        data: payload && payload.data,
        backgroundColor: [
          payload.colors ? payload.colors[0] : theme.palette.secondary.main,
          payload.colors ? payload.colors[1] : red[500],
          orange[500],
          theme.palette.grey[200],
        ],
        borderWidth: 5,
        borderColor: theme.palette.background.paper,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "bottom",
    },

    cutoutPercentage: cutoutPercentage ? cutoutPercentage : 80,
    tooltips: {
      yAlign: "top",
      callbacks: {
        label: function (tooltipItem: any, data: any) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return (
            convertToInternationalCurrencySystem(currentValue) +
            " (" +
            percentage +
            "%)"
          );
        },
        title: function (tooltipItem: any, data: any) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
  };

  return (
    <Card mb={0}>
      <CardContent>
        <ChartWrapper style={{ height: height ? height : "170px" }}>
          <DoughnutInner>
            <Typography variant="caption" style={{ fontWeight: "bold" }}>
              {payload && payload.value}
            </Typography>
            <br></br>
            <Typography variant="caption">{payload && payload.key}</Typography>
          </DoughnutInner>
          <Doughnut
            data={data}
            options={options}
            key={payload.key + "Doughnut"}
          />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(DoughnutChart);
