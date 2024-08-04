import React, { useEffect, useRef } from "react";
import { getHistoricalData, HistoricalData } from "../Services/api";
import Chart from "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import {
  ChartData,
  ChartOptions,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
  LineControllerChartOptions,
} from "chart.js";
import ChartMap from "./ChartMap";

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
interface LineChartProps {
  data: ChartData<"line">;
  options:
    | DeepPartial<
        CoreChartOptions<"line"> &
          ElementChartOptions<"line"> &
          PluginChartOptions<"line"> &
          DatasetChartOptions<"line"> &
          ScaleChartOptions<"line"> &
          LineControllerChartOptions
      >
    | undefined;
}

export default function Charts() {
  const canvas = useRef<HTMLCanvasElement>(null);

  const { data, isLoading, error } = useQuery<HistoricalData | undefined>({
    queryKey: ["historicalData"],
    queryFn: getHistoricalData,
  });

  type LineChartOptions = ChartOptions<"line">;

  const options: LineChartOptions = {
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  const chartData: ChartData<"line"> = {
    labels: data ? Object.keys(data.cases) : [],
    datasets: [
      {
        label: "Cases",
        data: data ? Object.values(data.cases) : [],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Deaths",
        data: data ? Object.values(data.deaths) : [],
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
      {
        label: "Recovered",
        data: data ? Object.values(data.recovered) : [],
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  useEffect(() => {
    if (canvas.current && data) {
      const chart = new Chart(canvas.current, {
        type: "line",
        data: chartData,
        options,
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data, options, chartData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <div className="w-[78vw] overflow-y-auto">
        <div>
          <canvas ref={canvas}></canvas>
          <div className="mt-5">
            <ChartMap />
          </div>
        </div>
      </div>
    </div>
  );
}
