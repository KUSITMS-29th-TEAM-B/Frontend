import React from "react";
import BubbleChartWithGradient from "../components/BubbleChartWithGradient";

const ExperiencePage = () => {
  const data2 = [
    {
      label: "Example",
      value: 12,
      option: "m",
    },
    {
      label: "두마리",
      value: 18,
      option: "l",
    },
    {
      label: "학교",
      value: 15,
      option: "l",
    },
    {
      label: "큐시즘",
      value: 10,
      option: "m",
    },
    {
      label: "서포터즈",
      value: 20,
      option: "l",
    },
    {
      label: "동아리",
      value: 6,
      option: "s",
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
