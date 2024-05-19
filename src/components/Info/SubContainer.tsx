import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    <Box className="subbox_exp">1번 컨테이너</Box>
    <Box className="subbox_jd">2번 컨테이너</Box>
  </SubContainer>
);

export default StyledSubContainer;

const SubContainer = styled.div`
    width: 100%;
    .subbox_exp{
        position: absolute;
        top: 24%;
        left: 12%;
        width: 35%;
        height: 60%;
        border-radius: 1.5rem;
        background: var(--icon-color, #FFF);
    }
    .subbox_jd{
        position: absolute;
        top: 24%;
        right: 12%;
        width: 35%;
        height: 60%;
        border-radius: 1.5rem;
        background: var(--icon-color, #FFF);
    }
`;
