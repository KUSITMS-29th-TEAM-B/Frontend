import React from "react";
import styled from "styled-components";
import filghtImage_2 from "../assets/images/image_flight_main_banner.png";
import overview from "../assets/images/image_info_overview.png";
import banner from "../assets/images/image_flight_banner.png";
import info_bg from "../assets/images/image_info_bg.png";
import Footer from "../components/common/Footer";

const InfoPage = () => {
  return (
    <StyledContainer className="page">
      <MainContainer>
        <div className="subtext">작년에는 뭘 했더라? 올해는?</div>
        <div className="maintext">나를 알아가는 경험 정리의 시작,</div>
        <img src={filghtImage_2} alt="frame" className="image" />
      </MainContainer>
      <MainContainer>
        <img src={info_bg} alt="bg" style={{ width: "100vw" }} />
        <SubContainer>
          <div className="subbox_exp">ss</div>
        </SubContainer>
        <SubContainer>
          <div className="subbox_jd">ss</div>
        </SubContainer>
      </MainContainer>
      <div>
        <img src={banner} alt="banner" className="sub_banner" />
      </div>
      <div>
        <img src={overview} alt="overview" className="overview" />
      </div>
      <Footer />
    </StyledContainer>
  );
};

export default InfoPage;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  .overview{
    width: 100vw;
    height: auto;
  }
  .sub_banner{
    width: 100vw;
    height: auto;
  }
`;

const MainContainer = styled.div`
    text-align: center;
    position: relative;
    .subtext{
        font-size: 2rem;
        font-style: normal;
        font-weight: 400;
        opacity: 0.4;
        color: ${(props) => props.theme.colors.neutral700};
    }
    .maintext{
        font-size: 3.75rem;
        font-style: normal;
        font-weight: 800;
        background: linear-gradient(89deg, #6167FF -10.58%, #7D82FF 47.56%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .image{
        width: 80rem;
        margin-top: 7rem;
    }
`;

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

const StepContainer = styled.div`
`;
