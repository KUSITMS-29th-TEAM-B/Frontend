import React from "react";
import styled from "styled-components";
import MainButton from "../common/MainButton";
import noExperienceImg from "../../assets/images/noExperience.png";
import { Plus } from "../../assets";
import { useNavigate } from "react-router-dom";

const NoExperience = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Section>
        아직 작성된 경험이 없어요. <br />새 경험을 작성해주세요.
      </Section>
      <MainButton onClick={() => navigate(`/experience/write`)}>
        경험추가하기 <Plus />
      </MainButton>
      <img
        src={noExperienceImg}
        alt="no-experience"
        style={{ marginTop: "-70px" }}
      />
    </Container>
  );
};

const Container = styled.div`
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  flex-shrink: 0;
  border-radius: 15px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 91px 138px;
  gap: 30px;
`;
const Section = styled.div`
  ${(props) => props.theme.fonts.title2};
  text-align: center;
`;

export default NoExperience;
