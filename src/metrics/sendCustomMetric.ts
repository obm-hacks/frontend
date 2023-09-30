import { YA_METRIKA_COUNTER } from '@/constants';

interface SendCustomMetricProps {
  type: 'reachGoal',
  value: 'predictClick' | 'modelResponse'
}

export const sendCustomMetric = ({ type, value }:SendCustomMetricProps ) => {
  if (!import.meta.env.DEV) {
    window.ym(YA_METRIKA_COUNTER, type, value)
  }
}