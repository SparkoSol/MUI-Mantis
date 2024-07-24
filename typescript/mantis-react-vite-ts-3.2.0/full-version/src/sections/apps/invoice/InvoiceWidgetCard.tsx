import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// third-party
import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

// project import
import MainCard from 'components/MainCard';

import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// assets
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';

interface Props {
  title: string;
  count: string;
  percentage?: number;
  isLoss?: boolean;
  color?: any;
  invoice: string;
  isActive: boolean;
}

// ==============================|| INVOICE - CARD ||============================== //

export default function TableWidgetCard({ color, title, count, percentage, isLoss, invoice, isActive }: Props) {
  const { mode } = useConfig();

  return (
    <MainCard
      {...(isActive && {
        sx: {
          bgcolor: mode === ThemeMode.DARK ? 'background.default' : 'secondary.lighter',
          borderColor: 'secondary.lighter'
        }
      })}
    >
      <Grid container spacing={1.25}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Typography variant="subtitle1">{title}</Typography>
            {percentage && (
              <Stack sx={{ ml: 1.25, pl: 1 }} direction="row" alignItems="center" spacing={1}>
                {!isLoss && <CaretUpOutlined style={{ fontSize: '0.75rem', color: color }} />}
                {isLoss && <CaretDownOutlined style={{ fontSize: '0.75rem', color: color }} />}
                <Typography color="secondary" variant="h5" sx={{ fontWeight: 500 }}>
                  {percentage}%
                </Typography>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={0.25}>
            <Typography variant="h5">{count}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h5">{invoice}</Typography>
              <Typography color="secondary">invoices</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}

// ==============================|| ORDERS CARD CHART ||============================== //

export const WidgetChart = ({ color, data }: any) => {
  const theme = useTheme();
  const { mode } = useConfig();

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      height: 100,
      type: 'area',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    stroke: {
      width: 1,
      curve: 'smooth'
    },
    grid: {
      show: false
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter(val: number) {
          return `$ ${val}`;
        }
      }
    }
  };

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [color.main],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme, color]);

  const [series] = useState([
    {
      name: 'Sales',
      data: data
    }
  ]);

  return <ReactApexChart options={options} series={series} type="area" height={80} />;
};
