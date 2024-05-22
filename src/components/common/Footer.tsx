import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/image_logo_set.png";

const Footer = () => {
  return (
    <StyledContainer>
      <TopConatiner>
        <img src={logo} alt="logo" className="logo" />
      </TopConatiner>
      <BottomConatiner>
        <div>
          <div className="service_info">
            <div className="sub-title">서비스명</div>
            <div className="sub-content">플라잇(Flight)</div>
          </div>
          <div className="service_info">
            <div className="sub-title">소속</div>
            <div className="sub-content">한국 대학생 IT 경영학회(KUSITMS)</div>
          </div>
          <div className="service_info">
            <div className="sub-title">팀</div>
            <div className="sub-content">밤양갱</div>
          </div>
        </div>
        <div>
          <div className="service_info">
            <div className="sub-title">기획</div>
            <div className="sub-content">민혜린(PM) 주연진 한나영</div>
          </div>
          <div className="service_info">
            <div className="sub-title">개발</div>
            <div className="sub-content">이효원 백승효 장세은 김용현</div>
          </div>
          <div className="service_info">
            <div className="sub-title">디자인</div>
            <div className="sub-content">윤예현 이어령</div>
          </div>
        </div>
      </BottomConatiner>
    </StyledContainer>
  );
};

export default Footer;

const StyledContainer = styled.div`
  display: flex;
  padding: 2rem 5rem;
  flex-direction: column;
  width: 100vw;
  height: 11.9375rem;
  background: ${(props) => props.theme.colors.main50};
`;

const TopConatiner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  .logo {
    width: 8rem;
  }
  .footer_btn {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    color: var(--neutral-600, #63698d);
    border: none;
    text-decoration: none;
  }
  .link {
    color: var(--neutral-600, #63698d);
    text-decoration: none;
  }
`;

const BottomConatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 4rem;
  ${(props) => props.theme.fonts.body4};
  color: ${(props) => props.theme.colors.neutral500};
  .service_info {
    display: flex;
    flex-direction: row;
    width: 19rem;
  }
  .sub-title {
    flex: 1;
  }
  .sub-content {
    flex: 4;
  }
`;
