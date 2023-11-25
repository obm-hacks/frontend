import { BuildingInfo } from '@/types';
import React, { useMemo } from 'react';

import {
  ILineChartDataPoint,
  ILineChartPoints,
  LegendShape,
  AreaChart,
  LineChart,
  ILineChartProps,
} from '@fluentui/react-charting';


type BuildingGraphsComponentProps = {
  buildingInfo: BuildingInfo[];
  currentChart: number;
}


type ChartData = {
  lineChartData: ILineChartPoints[];
  Chart: React.FunctionComponent<ILineChartProps>
};

const legendShape: LegendShape = 'square';

export const BuildingGraphsContainer = ({ buildingInfo, currentChart }: BuildingGraphsComponentProps) => {
  const predictionChartData = useMemo<ILineChartPoints[]>(() => [{
    legend: 'prediction',
    legendShape,
    data: buildingInfo.map<ILineChartDataPoint>(({ prediction, date }) => ({
      x: new Date(date),
      y: prediction,
      xAxisCalloutData: new Date(date).toDateString(),
      yAxisCalloutData: `${prediction.toLocaleString('en')} ₽`,
    })),
  }], [buildingInfo]);

  const weatherChartData = useMemo<ILineChartPoints[]>(() => [{
    legend: 'min',
    legendShape,
    data: buildingInfo.map<ILineChartDataPoint>(({ date, weather: { min } }) => ({
      x: new Date(date),
      y: min,
      xAxisCalloutData: new Date(date).toDateString(),

      yAxisCalloutData: `${min.toLocaleString('en')} °C`,
    })),
  }, {
    legend: 'avg',
    legendShape,
    data: buildingInfo.map<ILineChartDataPoint>(({ date, weather: { avg } }) => ({
      x: new Date(date), y: avg,
      xAxisCalloutData: new Date(date).toDateString(),
      yAxisCalloutData: `${avg.toLocaleString('en')} °C`,
    })),
  },
    {
      legend: 'max',
      legendShape,
      data: buildingInfo.map<ILineChartDataPoint>(({ date, weather: { max } }) => ({
        x: new Date(date), y: max,
        xAxisCalloutData: new Date(date).toDateString(),

        yAxisCalloutData: `${max.toLocaleString('en')} °C`,
      })),
    },
  ], [buildingInfo]);

  const precipitationChartData = useMemo<ILineChartPoints[]>(() => [{
    legend: 'precipitation',
    legendShape,
    data: buildingInfo.map<ILineChartDataPoint>(({ weather: { precipitation }, date }) => ({
      x: new Date(date),
      y: precipitation,
      xAxisCalloutData: new Date(date).toDateString(),
      yAxisCalloutData: `${precipitation.toLocaleString('en')} mm`,
    })),
  }], [buildingInfo]);



  const chartData: ChartData [] = [{
    lineChartData: predictionChartData,
    Chart: AreaChart,
  }, {
    lineChartData: weatherChartData,
    Chart: LineChart,
  }, {
    lineChartData: precipitationChartData,
    Chart: AreaChart,
  }];


  const { Chart, lineChartData } = chartData[currentChart];


  return <Chart
    tickFormat='%b %Y'
    xAxisTickCount={3}
    enabledLegendsWrapLines
    width={700}
    data={{
      lineChartData,
    }}
  />;
};