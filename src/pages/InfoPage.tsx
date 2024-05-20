import React from "react";
import styled from "styled-components";
import filghtImage_2 from "../assets/images/image_flight_main_banner.png";
import overview from "../assets/images/image_info_overview.png";
import banner from "../assets/images/image_flight_banner.png";
import info_bg from "../assets/images/image_info_bg.png";
import info_bg3 from "../assets/images/image_info_bg3.jpg";
import info_bg4 from "../assets/images/image_info_bg4.jpg";
import info_bg5 from "../assets/images/image_info_bg5.jpg";
import Footer from "../components/common/Footer";
import StyledSubContainer from "../components/Info/SubContainer";
import Filghtbackground from "../assets/images/image_flight_main_info.png";
import MainScreen from "../assets/images/image_info_main_screen.png";
import ScreenImage_1 from "../assets/images/image_info_screen_1.png";
import ScreenImage_2 from "../assets/images/image_info_screen_2.png";
import TextContainer from "../components/Info/TextContainer";
import { useNavigate } from "react-router-dom";

const InfoPage = () => {
  const nav = useNavigate();
  return (
    <StyledContainer>
      <MainContainer className="main_1">
        <img src={MainScreen} alt="flight" className="overview" />
        <div className="start_btn" onClick={() => nav("/sign-in")}>
          시작하기
        </div>
      </MainContainer>
      <MainContainer className="main_2">
        <div className="subtext">작년에는 뭘 했더라? 올해는?</div>
        <div className="maintext">나를 알아가는 경험 정리의 시작,</div>
        <img src={filghtImage_2} alt="frame" className="image" />
      </MainContainer>
      <div>
        <img src={Filghtbackground} alt="flight" className="overview" />
      </div>
      <MainContainer className="main_3">
        <img src={info_bg} alt="bg" style={{ width: "100vw" }} />
        <StyledSubContainer />
      </MainContainer>
      <MainContainer className="main_4">
        <div className="steptext">Step1</div>
        <div className="maintext">플라잇과 함께 나의 경험을 정리해볼까요?</div>
        <KeyWordWrapper>나의 경험</KeyWordWrapper>
        <ContentWrapper>
          <div className="main_content">
            연도별로 나의 경험을 시각화해서 보여줘요
          </div>
          <div className="sub_content">
            정리해놓지 않으면 금방 휘발되는 나의 경험들을 체계적으로 정리할 수
            있어요
          </div>
          <img src={ScreenImage_1} alt="screenshot" className="screenshot" />
        </ContentWrapper>
      </MainContainer>
      <MainContainer className="main_4">
        <div>contentbox</div>
        <img src={ScreenImage_2} alt="screenshot" className="sub_screenshot" />
        <img src={info_bg3} alt="bg" style={{ width: "100vw" }} />
      </MainContainer>
      <div>
        <img src={banner} alt="banner" className="sub_banner" />
      </div>
      <MainContainer className="main_5">
        <div className="steptext">Step2</div>
        <div className="maintext_2">
          채용공고부터 자기소개서까지
          <br />
          모두 플라잇에서!
        </div>
        <KeyWordWrapper>나의 경험</KeyWordWrapper>
        <ContentWrapper>
          <div className="main_content">
            연도별로 나의 경험을 시각화해서 보여줘요
          </div>
          <div className="sub_content">
            정리해놓지 않으면 금방 휘발되는 나의 경험들을 체계적으로 정리할 수
            있어요
          </div>
          <img src={ScreenImage_1} alt="screenshot" className="screenshot" />
        </ContentWrapper>
      </MainContainer>
      <MainContainer className="main_6">
        <KeyWordWrapper className="keyword">자기소개서 작성</KeyWordWrapper>
        <ContentWrapper>
          <div className="main_content">
            유기적인 연결을 통해 나만의 스토리를 만들어보세요
          </div>
          <div className="sub_content">
            기업에서는 요구하는 다양한 역량에 대해 어떤 경험을 어필해야 할지
            모르겠다면? 플라잇에서 정리한 경험을 바탕으로 역량을 파악하고
            자기소개서를 작성해요
          </div>
        </ContentWrapper>
        <ImageWrapper>
          <img src={info_bg4} alt="bg" style={{ width: "100%" }} />
        </ImageWrapper>
      </MainContainer>
      <MainContainer className="main_7">
        <img src={info_bg5} alt="bg" style={{ width: "100vw" }} />
      </MainContainer>
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
  margin-top: 6.125rem;
  padding: 3.5625rem 8.75rem;
  padding-top: 0;
  padding-bottom: 0;
  .main_1{
    margin-bottom: 7rem;
  }
  .overview{
    width: 100vw;
    height: auto;
  }
  .sub_banner{
    width: 100vw;
    height: auto;
  }
  .main_4{
    margin-bottom: 8rem;
  }
  .main_6{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
`;

const MainContainer = styled.div`
    text-align: center;
    position: relative;
    .steptext{
        opacity: 0.6;
        color: ${(props) => props.theme.colors.main500};
        ${(props) => props.theme.fonts.headline3};
        margin-top: 11rem;
        margin-bottom: 1.25rem;
    }
    .subtext{
        font-size: 2rem;
        font-style: normal;
        font-weight: 400;
        opacity: 0.4;
        color: ${(props) => props.theme.colors.neutral700};
        margin-bottom: 0.75rem;
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
    .maintext_2{
        font-size: 3.75rem;
        font-style: normal;
        font-weight: 800;
        height: 11rem;
        line-height: 150%; 
        letter-spacing: -0.1125rem;
        background: linear-gradient(89deg, #6167FF -10.58%, #7D82FF 47.56%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .image{
        width: 80rem;
        margin-top: 7rem;
    }
    .start_btn{
        position: absolute;
        width: 22rem;
        height: 5rem;
        bottom: 15%;
        right: 37%;
        border-radius: 5rem;
        color: var(--white);
        display: flex;
        justify-content: center;
        align-items: center;
        ${(props) => props.theme.fonts.headline2};
        background: linear-gradient(134deg, #7D82FF 21.06%, #444CFF 162.77%);
    }
    .sub_screenshot{
        position: absolute;
        width: 50%;
        right: 5rem;
        bottom: 5px;
    }
    .keyword {
        width: 14rem;
    }
`;

const ImageWrapper = styled.div`
    width: 80vw;
    border-radius: 1rem;
`;

const KeyWordWrapper = styled.div`
    margin-top: 5rem;
    border-radius: 1.25rem;
    background: ${(props) => props.theme.colors.main50};
    color: ${(props) => props.theme.colors.main400};
    ${(props) => props.theme.fonts.title2};
    display: inline-flex;
    padding: 0.4375rem 1.4375rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    .main_content{
        color: ${(props) => props.theme.colors.neutral700};
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        letter-spacing: -0.1rem;
    }
    .sub_content{
        opacity: 0.6;
        color: ${(props) => props.theme.colors.neutral700};
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 400;
        line-height: 140%; 
        letter-spacing: -0.06rem;
        margin-top: 1.25rem;
    }
    .screenshot{
        width: 100%;
        margin-top: 7rem;
        margin-bottom: 7rem;
    }

    
`;
