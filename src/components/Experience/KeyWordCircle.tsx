import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface SmallCircleComponentProps {
  idx: number;
}

const SmallCircle = styled(motion.div)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: orange;
  position: absolute;
`;

const SmallCircleComponent: React.FC<SmallCircleComponentProps> = ({ idx }) => {
  return <SmallCircle />;
};

export default SmallCircleComponent;
