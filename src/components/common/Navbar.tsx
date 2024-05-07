import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <ItemContainer>
        <img src={logo} alt="flight-logo" width={"117px"} height={"40px"} />
        <MenuList>
          <MenuItem onClick={() => navigate(`/experience`)}>경험 정리</MenuItem>
          <MenuItem onClick={() => navigate(`/jd`)}>JD 분석</MenuItem>
        </MenuList>
      </ItemContainer>
      <ItemContainer>
        검색컴포넌트
        <UserInfo onClick={() => navigate(`/mypage`)}>사용자 정보</UserInfo>
      </ItemContainer>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  width: 100%;
  height: 6.125rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 16px 0px rgba(26, 29, 46, 0.1);
  align-items: center;
  justify-content: space-between;
  padding: 2.375rem 4rem;
  z-index: 1000;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.5rem;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.5rem;
`;

const MenuItem = styled.div``;

const UserInfo = styled.div``;

export default Navbar;
