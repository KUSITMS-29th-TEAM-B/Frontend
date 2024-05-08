import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import circleS from "../assets/images/circleS.png";
import circleM from "../assets/images/circleM.png";
import circleL from "../assets/images/circleL.png";

interface DataItem {
  label: string;
  value: number;
  option: string;
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
      .append("image")
      .attr(
        "xlink:href",
        (d: any) =>
          `${
            d.data.option === "l"
              ? circleL
              : d.data.option === "m"
              ? circleM
              : circleS
          }`
      )
      .attr("width", (d) => d.r * 2) // 노드 반지름의 두 배
      .attr("height", (d) => d.r * 2)
      .attr("x", (d) => -d.r) // 이미지를 중앙에 위치
      .attr("y", (d) => -d.r);

    // 텍스트 추가, 각 tspan 요소로 이름과 값을 나눔
    node
      .append("text")
      .attr("text-anchor", "middle") // 텍스트 중앙 정렬
      .each(function (d: any) {
        const fontSize = Math.max(10, d.r / 5);
        d3.select(this)
          .append("tspan")
          .attr("x", 0)
          .attr("dy", "-0.3em") // 첫 번째 줄 위치 조정
          .text(d.data.label)
          .style("font-weight", "bold")
          .style("font-size", fontSize + "px");

        d3.select(this)
          .append("tspan")
          .attr("x", 0)
          .attr("dy", "1.2em") // 두 번째 줄 위치 조정
          .text(d.data.value)
          .style("font-size", fontSize + "px");
      })
      .style(
        "fill",
        (d: any) => `${d.data.option === "l" ? "white" : "black"}`
      );

    // 마우스 이벤트를 추가하는 부분
    node
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", `translate(${d.x},${d.y}) scale(1.1)`); // 10% 확대
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", `translate(${d.x},${d.y}) scale(1)`); // 원래 크기로 복귀
      });
  }, [data]);

  return (
    <div className="container">
      <svg ref={ref}></svg>
    </div>
  );
};

export default BubbleChartWithGradient;
