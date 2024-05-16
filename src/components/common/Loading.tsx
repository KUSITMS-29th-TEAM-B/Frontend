import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import airplane from "../../assets/images/airplane.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px; 
  overflow: hidden;
`;

const Airplane = styled(motion.div)`
    width: 10rem;
    height: 10rem;
    background-image: url(${airplane}); 
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center; 
    position: absolute;
`;

const Path = styled(motion.div)`
  height: 2px;
  background: gray; 
  position: absolute;
`;

const PlaneLoading: React.FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container>
      {/* <Path
        initial={{ x: -180, width: 100 }}
        animate={{ x: 20, width: 150 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 1,
          ease: "linear",
        }}
      /> */}
      <Airplane
        animate={{ x: 100 }}
        initial={{ x: -100 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "linear",
        }}
      />
    </Container>
  );
};

export default PlaneLoading;
