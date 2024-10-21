import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    achat: 59,
    vente: 80,
    month: 'Jan',
  },
  {
    achat: 59,
    vente: 60,
    month: 'Fev',
  },
  {
    achat: 59,
    vente: 45,
    month: 'Mar',
  },
  {
    achat: 59,
    vente: 90,
    month: 'Apr',
  },
  {
    achat: 59,
    vente: 70,
    month: 'May',
  },
  {
    achat: 59,
    vente: 44,
    month: 'June',
  },
  {
    achat: 30,
    vente: 20,
    month: 'July',
  },
  {
    achat: 45,
    vente: 57,
    month: 'Aug',
  },
  {
    achat: 75,
    vente: 57,
    month: 'Sept',
  },
  {
    achat: 30,
    vente: 57,
    month: 'Oct',
  },
  {
    achat: 70,
    vente: 82,
    month: 'Nov',
  },
  {
    achat: 15,
    vente: 30,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value} DH`;

export default function LinesChart() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'achat', label: 'Achat', valueFormatter },
        { dataKey: 'vente', label: 'Vente', valueFormatter },

      ]}
      {...chartSetting}
    />
  );
}