import React from "react";
import MyResponsiveCirclePacking from "../components/MyResponsiveCirclePacking";
import BubbleChartWithGradient from "../components/BubbleChartWithGradient";

const ExperiencePage = () => {
  const data = {
    children: [
      {
        name: "address",
        color: "hsl(179, 70%, 50%)",
        loc: 800000,
      },
      {
        name: "city",
        color: "hsl(171, 70%, 30%)",
        loc: 39954,
      },
      {
        name: "animal",
        color: "red",
        loc: 60790,
      },
      {
        name: "movie",
        color: "hsl(34, 70%, 50%)",
        loc: 147184,
      },
      {
        name: "user",
        color: "hsl(232, 70%, 50%)",
        loc: 199460,
      },
    ],
  };

  const data2 = [
    {
      label: "Example",
      value: 12,
      colorStart: "rgba(255, 245, 209, 0.70)",
      offsetStart: "23.15%",
      colorEnd: "rgba(255, 255, 255, 0.00)",
      offsetEnd: "141.03%",
    },
    {
      label: "두마리",
      value: 18,
      colorStart: "#7D82FF",
      offsetStart: "0%",
      colorEnd: "rgba(125, 130, 255, 0.20)",
      offsetEnd: "100%",
    },
    {
      label: "학교",
      value: 15,
      colorStart: "#7D82FF",
      offsetStart: "0%",
      colorEnd: "rgba(125, 130, 255, 0.20)",
      offsetEnd: "100%",
    },
    {
      label: "큐시즘",
      value: 10,
      colorStart: "rgba(255, 245, 209, 0.70)",
      offsetStart: "23.15%",
      colorEnd: "rgba(255, 255, 255, 0.00)",
      offsetEnd: "141.03%",
    },
    {
      label: "서포터즈",
      value: 20,
      colorStart: "#7D82FF",
      offsetStart: "0%",
      colorEnd: "rgba(125, 130, 255, 0.20)",
      offsetEnd: "100%",
    },
    {
      label: "동아리",
      value: 6,
      colorStart: "#EAEBF3",
      offsetStart: "0%",
      colorEnd: "#EAEBF3",
      offsetEnd: "100%",
    },
  ];

  return (
    <div className="page">
      {/* <MyResponsiveCirclePacking data={data} /> */}
      <BubbleChartWithGradient data={data2} />
    </div>
  );
};

export default ExperiencePage;
