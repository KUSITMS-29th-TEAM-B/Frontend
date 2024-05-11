import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px; 
  overflow: hidden;
`;

const Airplane = styled(motion.div)`
  width: 50px; 
  height: 50px; 
  background-image: url('https://icons.iconarchive.com/icons/icons8/windows-8/512/Transport-Airplane-Mode-On-icon.png'); // Airplane icon URL
  background-size: cover;
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
      <Airplane
        animate={{ x: 100 }}
        initial={{ x: -100 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 1,
          ease: "linear",
        }}
      />
    </Container>
  );
};

export default PlaneLoading;
