import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataItem {
  label: string;
  value: number;
  colorStart: string;
  offsetStart: string;
  colorEnd: string;
  offsetEnd: string;
}

const BubbleChartWithGradient = ({ data }: { data: DataItem[] }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3
      .select(ref.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 600 400")
      .attr("preserveAspectRatio", "xMidYMid meet");

    const defs = svg.append("defs");
    data.forEach((item) => {
      const gradient = defs
        .append("linearGradient")
        .attr("id", `gradient${item.label}`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", item.offsetStart)
        .attr("stop-color", item.colorStart);
      gradient
        .append("stop")
        .attr("offset", item.offsetEnd)
        .attr("stop-color", item.colorEnd);
    });

    const pack = d3.pack().size([600, 400]).padding(10);
    const root = d3.hierarchy({ children: data }).sum((d: any) => d.value);
    const nodes = pack(root).leaves();

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d: any) => `url(#gradient${d.data.label})`);

    // 텍스트 추가, 각 tspan 요소로 이름과 값을 나눔
    node
      .append("text")
      .attr("text-anchor", "middle") // 텍스트 중앙 정렬
      .each(function (d: any) {
        d3.select(this)
          .append("tspan")
          .attr("x", 0)
          .attr("dy", "-0.3em") // 첫 번째 줄 위치 조정
          .text(d.data.label)
          .style("font-weight", "bold");

        d3.select(this)
          .append("tspan")
          .attr("x", 0)
          .attr("dy", "1.2em") // 두 번째 줄 위치 조정
          .text(d.data.value);
      })
      .style("fill", "black")
      .style("font-size", "12px");
  }, [data]);

  return (
    <div className="container">
      <svg ref={ref}></svg>
    </div>
  );
};

export default BubbleChartWithGradient;
