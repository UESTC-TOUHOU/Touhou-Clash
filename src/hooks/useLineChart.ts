import type { ChartConfiguration } from 'chart.js';
import React from 'react';

import { commonChartOptions } from '~/misc/chart';
import { memoryChartOptions } from '~/misc/chart-memory';

const { useEffect } = React;

export default function useLineChart(
  chart: typeof import('chart.js').Chart,
  elementId: string,
  data: ChartConfiguration['data'],
  subscription: any,
  extraChartOptions = {}
) {
  useEffect(() => {
    const ctx = (document.getElementById(elementId) as HTMLCanvasElement).getContext('2d');
    const options = { ...commonChartOptions, ...extraChartOptions };
    const c = new chart(ctx, { type: 'line', data, options });
    const unsubscribe = subscription && subscription.subscribe(() => c.update());
    return () => {
      unsubscribe && unsubscribe();
      c.destroy();
    };
  }, [chart, elementId, data, subscription, extraChartOptions]);
}

export function useLineChartMemory(
  chart: typeof import('chart.js').Chart,
  elementId: string,
  data: ChartConfiguration['data'],
  subscription: any,
  extraChartOptions = {}
) {
  useEffect(() => {
    const ctx = (document.getElementById(elementId) as HTMLCanvasElement).getContext('2d');
    const options = { ...memoryChartOptions, ...extraChartOptions };
    const c = new chart(ctx, { type: 'line', data, options });
    const unsubscribe = subscription && subscription.subscribe(() => c.update());
    return () => {
      unsubscribe && unsubscribe();
      c.destroy();
    };
  }, [chart, elementId, data, subscription, extraChartOptions]);
}
