import React from "react";
import ExpData from "../../services/JD/ExpData";
import Experience from "./Experience";

const ExperienceList = () => {
  return (
    <>
      {ExpData.map((post) => (
        <Experience
          title={post.title}
          content={post.content}
          tags={post.tags}
        />
      ))}
    </>
  );
};

export default ExperienceList;
