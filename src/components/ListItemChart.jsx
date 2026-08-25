import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { useD3 } from "../hooks/useD3";

function ListItemChart({ data, height }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  const chartData = useMemo(
    () =>
      data
        .map((d) => ({
          ...d,
          date: new Date(d.date * 1000),
        }))
        .sort((a, b) => a.date - b.date),
    [data],
  );

  useLayoutEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });

    observer.observe(element);

    setWidth(Math.floor(element.getBoundingClientRect().width));

    return () => observer.disconnect();
  }, []);

  const ref = useD3(
    (svg) => {
      if (!width || chartData.length < 2) return;

      const padding = 2;

      const firstClose = chartData[0].close;
      const lastClose = chartData[chartData.length - 1].close;

      const isPositive = lastClose >= firstClose;

      const color = isPositive ? "#16a34a" : "#ef4444";

      const x = d3
        .scaleTime()
        .domain(d3.extent(chartData, (d) => d.date))
        .range([padding, width - padding]);

      let min = d3.min(chartData, (d) => d.close);
      let max = d3.max(chartData, (d) => d.close);

      if (min === max) {
        min -= 1;
        max += 1;
      }

      const y = d3
        .scaleLinear()
        .domain([min, max])
        .nice()
        .range([height - padding, padding]);

      const line = d3
        .line()
        .x((d) => x(d.date))
        .y((d) => y(d.close))
        .curve(d3.curveMonotoneX);

      svg
        .select(".line")
        .datum(chartData)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("d", line);
    },
    [chartData, width, height],
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height,
      }}
    >
      <svg
        ref={ref}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
      >
        <path className="line" />
      </svg>
    </div>
  );
}

export default ListItemChart;
