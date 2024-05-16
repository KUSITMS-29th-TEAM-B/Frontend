import React from "react";
import styled, { useTheme } from "styled-components";
import logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import MainButton from "./MainButton";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavContainer>
      <ItemContainer>
        <img src={logo} alt="flight-logo" width={"117px"} height={"40px"} />
        <MenuList>
          <MenuItem
            className={
              location.pathname.includes("/experience") ? "active" : ""
            }
            onClick={() => navigate(`/experience`)}
          >
            나의 경험
          </MenuItem>
          <MenuItem
            className={location.pathname.includes("/jd") ? "active" : ""}
            onClick={() => navigate(`/jd`)}
          >
            채용공고 관리
          </MenuItem>
        </MenuList>
      </ItemContainer>
      <ItemContainer>
        <LoginButton onClick={() => navigate(`/sign-in`)}>로그인</LoginButton>
        <UserInfo onClick={() => navigate(`/mypage`)}>사용자님</UserInfo>
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

const MenuItem = styled.div`
  ${(props) => props.theme.fonts.subtitle2}
  cursor: pointer;
  &:hover,
  &.active {
    color: ${(props) => props.theme.colors.main500};
    text-decoration: underline;
    text-underline-position: under;
    text-underline-offset: 1px;
    text-decoration-thickness: 3px;
  }
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  ${(props) => props.theme.fonts.cap2}
  color: ${(props) => props.theme.colors.neutral800};
  flex-shrink: 0;
`;

const LoginButton = styled.div`
  padding: 6px 24px;
  ${(props) => props.theme.fonts.subtitle5};
  color: white;
  border-radius: 8px;
  background: var(--sub-secondary-500, #9aaaff);
`;
export default Navbar;
