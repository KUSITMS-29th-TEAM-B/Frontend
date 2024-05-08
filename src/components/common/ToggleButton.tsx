import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  isActive: boolean;
}

const ToggleContainer = styled.div`
  width: 13rem;
  height: 1.8925rem;
  display: flex;
  justify-content: space-between;
  background-color: #eeeff7;
  border-radius: 20px;
  position: relative;
  padding: 0;
  overflow: hidden;
`;

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 1.8925rem;
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  background-color: transparent;
  font-size: 0.70419rem;
  color: ${(props) => (props.isActive ? "white" : "black")};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const Highlight = styled(motion.div)`
  width: 33.3333%;
  background-color: #adb1ff;
  border-radius: 15px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
`;

const ToggleButton: React.FC = () => {
  const menu = ["연도별", "활동별", "역량별"];
  const [active, setActive] = useState<(typeof menu)[number]>(menu[0]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current active menu:", active);
  }, [active]);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const handleTabClick = (menu: string) => {
    setActive(menu);
    navigate(`/experience?tab=${menu}`);
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
          isActive={menu === active}
          onClick={() => handleTabClick(menu)}
          style={{ zIndex: 1 }}
        >
          {menu}
        </Button>
      ))}
    </ToggleContainer>
  );
};
export default ToggleButton;
