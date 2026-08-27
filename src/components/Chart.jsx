import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { useD3 } from "../hooks/useD3";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Chart({ data, currencySymbol = "$" }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [tooltip, setTooltip] = useState(null);

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

    if (!element) {
      return;
    }

    const updateWidth = () => {
      setWidth(Math.floor(element.getBoundingClientRect().width));
    };

    updateWidth();

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        setWidth(Math.floor(entry.contentRect.width));
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  const height = Math.min(500, width * 0.65);

  const ref = useD3(
    (svg) => {
      if (!width || chartData.length === 0) {
        return;
      }

      const margin = {
        top: 0,
        right: 10,
        bottom: 20,
        left: 40,
      };

      const gap = 20;

      const volumeHeight = Math.max(50, height * 0.2);

      const volumeBottom = height - margin.bottom;
      const volumeTop = volumeBottom - volumeHeight;

      const priceBottom = volumeTop - gap;

      const innerWidth = width - margin.left - margin.right;

      // X scale
      const x = d3
        .scaleBand()
        .domain(chartData.map((d) => d.date))
        .range([margin.left, width - margin.right])
        .padding(0.25);

      // Price scale
      const minPrice = d3.min(chartData, (d) => d.low);
      const maxPrice = d3.max(chartData, (d) => d.high);

      const yPrice = d3
        .scaleLinear()
        .domain([minPrice, maxPrice])
        .rangeRound([priceBottom, margin.top]);

      // Volume scale
      const maxVolume = d3.max(chartData, (d) => d.volume) || 1;

      const yVolume = d3
        .scaleLinear()
        .domain([0, maxVolume])
        .nice()
        .range([volumeBottom, volumeTop]);

      // X-axis ticks
      const desiredTickCount = Math.max(3, Math.floor(innerWidth / 80));

      const tickStep = Math.max(
        1,
        Math.ceil(chartData.length / desiredTickCount),
      );

      const xTickValues = chartData
        .filter((_, i) => i % tickStep === 0)
        .map((d) => d.date);

      const formatAxisDate = d3.utcFormat("%b %d");

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${volumeBottom})`)
          .call(
            d3
              .axisBottom(x)
              .tickValues(xTickValues)
              .tickFormat(formatAxisDate)
              .tickSizeOuter(0),
          )
          .call((g) => g.select(".domain").remove());

      // Price Y-axis
      const priceTickValues = d3.scaleLinear().domain(yPrice.domain()).ticks(6);

      const priceYAxis = (g) => {
        // Remove previously generated grid lines
        g.selectAll(".grid-line").remove();

        g.attr("transform", `translate(${margin.left},0)`)
          .call(
            d3
              .axisLeft(yPrice)
              .tickValues(priceTickValues)
              .tickFormat(
                (value) => `${currencySymbol}${d3.format("~f")(value)}`,
              ),
          )
          .call((g) => g.select(".domain").remove());

        // Horizontal grid lines
        g.selectAll(".tick line")
          .clone()
          .attr("class", "grid-line")
          .attr("x2", innerWidth)
          .attr("stroke-opacity", 0.15);
      };

      // Volume Y-axis
      const volumeYAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(yVolume).ticks(3).tickFormat(d3.format("~s")))
          .call((g) => g.select(".domain").remove());

      // Draw axes
      svg.select(".x-axis").call(xAxis);
      svg.select(".price-y-axis").call(priceYAxis);
      svg.select(".volume-y-axis").call(volumeYAxis);

      // OHLC
      const tickWidth = Math.max(1, Math.min(5, x.bandwidth() / 2));

      const color = (d) => {
        if (d.close > d.open) {
          return d3.schemeSet1[2]; // up
        }

        if (d.close < d.open) {
          return d3.schemeSet1[0]; // down
        }

        return d3.schemeSet1[8]; // unchanged
      };

      const ohlc = svg
        .select(".ohlc-area")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("path.ohlc")
        .data(chartData, (d) => d.id ?? d.date.getTime())
        .join("path")
        .attr("class", "ohlc")
        .attr("stroke", color)
        .attr("d", (d) => {
          const center = x(d.date) + x.bandwidth() / 2;

          return `
            M${center},${yPrice(d.low)}
            V${yPrice(d.high)}

            M${center},${yPrice(d.open)}
            h${-tickWidth}

            M${center},${yPrice(d.close)}
            h${tickWidth}
          `;
        });

      // Tooltip
      const dataPointCenters = chartData.map(
        (d) => x(d.date) + x.bandwidth() / 2,
      );

      svg
        .select(".interaction-area")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", innerWidth)
        .attr("height", volumeBottom - margin.top)
        .attr("fill", "transparent")
        .on("pointermove", (event) => {
          const [pointerX, pointerY] = d3.pointer(event, svg.node());

          const index = d3.bisectCenter(dataPointCenters, pointerX);
          const d = chartData[index];

          if (!d) {
            return;
          }

          setTooltip({
            x: pointerX,
            y: pointerY,
            data: d,
          });
        })
        .on("pointerleave", () => {
          setTooltip(null);
        });

      // Volume bars
      const volumeBars = svg
        .select(".volume-area")
        .selectAll("rect.volume-bar")
        .data(chartData, (d) => d.id ?? d.date.getTime())
        .join("rect")
        .attr("class", "volume-bar")
        .attr("x", (d) => x(d.date))
        .attr("width", x.bandwidth())
        .attr("y", (d) => yVolume(d.volume))
        .attr("height", (d) => volumeBottom - yVolume(d.volume))
        .attr("fill", color)
        .attr("opacity", 0.5);

      volumeBars
        .selectAll("title")
        .data((d) => [d])
        .join("title")
        .text((d) => `Volume: ${d3.format(",")(d.volume)}`);

      // Separator
      svg
        .select(".separator")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("y1", volumeTop - gap / 2)
        .attr("y2", volumeTop - gap / 2)
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.15);
    },

    [chartData, width, height],
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <svg
        ref={ref}
        width={width}
        height={height}
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <g className="ohlc-area" />

        <g className="volume-area" />

        <line className="separator" />

        <g className="price-y-axis" />

        <g className="volume-y-axis" />

        <g className="x-axis" />

        <rect className="interaction-area" />
      </svg>
      {tooltip && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            left: tooltip.x > width - 220 ? tooltip.x - 210 : tooltip.x + 12,
            top: tooltip.y + 12,
            zIndex: 2,
            p: 1.5,
            minWidth: 180,
            pointerEvents: "none",
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            {d3.utcFormat("%B %d, %Y")(tooltip.data.date)}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              columnGap: 2,
              rowGap: 0.25,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Open
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "right" }}>
              {currencySymbol}
              {d3.format(",.2f")(tooltip.data.open)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              High
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "right" }}>
              {currencySymbol}
              {d3.format(",.2f")(tooltip.data.high)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Low
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "right" }}>
              {currencySymbol}
              {d3.format(",.2f")(tooltip.data.low)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Close
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "right" }}>
              {currencySymbol}
              {d3.format(",.2f")(tooltip.data.close)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Change
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "right",
                color:
                  tooltip.data.close > tooltip.data.open
                    ? "success.main"
                    : tooltip.data.close < tooltip.data.open
                      ? "error.main"
                      : "text.secondary",
              }}
            >
              {d3.format("+.2%")(
                (tooltip.data.close - tooltip.data.open) / tooltip.data.open,
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Volume
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "right" }}>
              {d3.format(",")(tooltip.data.volume)}
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default Chart;
