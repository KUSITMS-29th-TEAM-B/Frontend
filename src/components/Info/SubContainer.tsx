import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import exprImage from "../../assets/images/image_info_expr.png";
import jdImage from "../../assets/images/image_info_jd.png";

type BoxProps = {
  className?: string;
  children: React.ReactNode;
};

const Box: React.FC<BoxProps> = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const boxVariants: Variants = {
    hidden: { opacity: 0, y: 300 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={boxVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StyledSubContainer = () => (
  <SubContainer>
    <Box className="subbox_exp">
      <Number>1</Number>
      <Title>경험 정리</Title>
      <Content>
        질문형 프레임워크에 따라
        <br />
        경험을 체계적으로 정리해요
      </Content>
      <div style={{ width: "100%", marginTop: "2.5rem" }}>
        <img src={exprImage} alt="experience" />
      </div>
    </Box>
    <Box className="subbox_jd">
      <Number>2</Number>
      <Title>채용공고 관리</Title>
      <Content>
        원하는 채용공고만 모아 관리하고
        <br />
        자기소개서도 한 번에 작성해요
      </Content>
      <div style={{ width: "100%", marginTop: "2.5rem" }}>
        <img src={jdImage} alt="job" />
      </div>
    </Box>
  </SubContainer>
);

export default StyledSubContainer;

const SubContainer = styled.div`
  width: 100%;
  .subbox_exp {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 4rem 4.5rem;
    top: 25%;
    left: 12%;
    width: 35%;
    height: 65%;
    border-radius: 1.5rem;
    background: var(--icon-color, #fff);
    img {
      width: 80%;
      height: 100%;
    }
    overflow: hidden;
  }
  .subbox_jd {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 4rem 4.5rem;
    top: 25%;
    right: 12%;
    width: 35%;
    height: 65%;
    border-radius: 1.5rem;
    background: var(--icon-color, #fff);
    img {
      width: 60%;
      height: 100%;
    }
    overflow: hidden;
  }
`;

const Number = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  color: #fff;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.main400};
  ${(props) => props.theme.fonts.title2};
`;

const Title = styled.div`
  font-family: Pretendard-Bold;
  font-size: 32px;
  font-style: normal;
  line-height: 140%; /* 44.8px */
  letter-spacing: -1.28px;
  margin-top: 1.25rem;
  text-align: left;
  color: ${(props) => props.theme.colors.neutral700};
`;

const Content = styled.div`
  font-family: Pretendard-Regular;
  margin-top: 1rem;
  text-align: left;
  font-size: 20px;
  font-style: normal;
  line-height: 140%; /* 28px */
  letter-spacing: -0.8px;
  opacity: 0.4;
  color: ${(props) => props.theme.colors.neutral700};
`;
