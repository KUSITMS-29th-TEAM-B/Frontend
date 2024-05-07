import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ToggleContainer = styled.div`
  width: 330px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: #EEEFF7; 
  border-radius: 20px; 
  position: relative;
  padding: 0;
  overflow: hidden;
`;

const Button = styled.button`
    width: 100%;
    height: 40px;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    background-color: transparent;
    color: white;
    cursor: pointer;
    &:focus {
    outline: none;
    }
`;

const Highlight = styled(motion.div)`
  width: 33.3333%; 
  background-color: #ADB1FF;
  border-radius: 15px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0; 
  z-index: 0;
`;

const ToggleButton: React.FC = () => {
  const menu = ["연도별", "활동별", "역량별"];
  const [active, setActive] = useState(menu[0]);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <ToggleContainer>
      <Highlight
        initial={false}
        animate={{ x: `${menu.indexOf(active) * 100}%` }}
        transition={spring}
      />
      {menu.map((menu, index) => (
        <Button
          key={menu}
          onClick={() => setActive(menu)}
          style={{ zIndex: 1 }}
        >
          {menu}
        </Button>
      ))}
    </ToggleContainer>
  );
};
export default ToggleButton;
