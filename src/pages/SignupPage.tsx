import styled from "styled-components";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import MainButton from "../components/common/MainButton";
import { theme } from "../styles/theme";
import profile1 from "../assets/images/profile1.png";
import profile2 from "../assets/images/profile2.png";
import profile3 from "../assets/images/profile3.png";
import profile4 from "../assets/images/profile4.png";
import profile5 from "../assets/images/profile5.png";
import React from "react";
import { jobStateOptions } from "../assets/data/form";
import { Popper } from "@mui/material";
import Modal from "../components/common/Modal";
import logoImg from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { getUserInfo, refresh, register } from "../services/user";
import { RegisterDataType } from "../types/user";
import { getCookie, setCookie } from "../services/cookie";

const profileImgUrl = [
  "/assets/profile1.png",
  "/assets/profile2.png",
  "/assets/profile3.png",
  "/assets/profile4.png",
  "/assets/profile5.png",
];

const SignupPage = () => {
  const navigate = useNavigate();
  const user = getCookie("user");

  const [registerData, setRegisterData] = React.useState<RegisterDataType>({
    registrationToken: user?.token,
    profileImgUrl: "",
    provider: user?.provider,
    nickName: "",
    jobSearchStatus: "",
    desiredJob: "",
    goal: "",
    dream: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const [isModalOpen, setIsModalOpen] = React.useState(false); // 저장 모달

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // 팝업 위치 관리
  const [popperWidth, setPopperWidth] = React.useState(0);
  const open = Boolean(anchorEl);
  const id = open ? "tag-popper" : undefined;

  // 모달 관리
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTagPopper = (event: React.MouseEvent<HTMLElement>) => {
    setPopperWidth(event.currentTarget.clientWidth);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleOptionClick = (item: string) => {
    setRegisterData({ ...registerData, jobSearchStatus: item });
    setAnchorEl(null);
  };

  const handleRegister = () => {
    register(registerData).then((res) => {
      setIsLoading(true);
      const token = res.data.accessToken;
      const refreshToken = res.data.refreshToken;
      getUserInfo(token)
        .then((res) => {
          setCookie("user", {
            ...user,
            nickName: res.data.nickName,
            profileImgUrl: res.data.profileImgUrl,
            provider: res.data.provider,
            email: res.data.email,
            token: token,
            refreshToken: refreshToken,
          });
          setTimeout(() => refresh(refreshToken), 1000 * 60 * 60 * 23);
        })
        .then(() => openModal());
    });
    setIsLoading(false);
  };

  return (
    <>
      <Container className="page">
        <Title>회원가입</Title>
        <FormContainer>
          <ProfileFormContainer>
            <div className="profile-label">
              프로필 사진을 선택해주세요.<span className="required">*</span>
            </div>
            <div className="profile-list">
              <div
                className={
                  registerData.profileImgUrl === profileImgUrl[0]
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setRegisterData({
                    ...registerData,
                    profileImgUrl: profileImgUrl[0],
                  })
                }
              >
                <img src={profile1} alt="profile1" />
              </div>
              <div
                className={
                  registerData.profileImgUrl === profileImgUrl[1]
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setRegisterData({
                    ...registerData,
                    profileImgUrl: profileImgUrl[1],
                  })
                }
              >
                <img src={profile2} alt="profile2" />
              </div>
              <div
                className={
                  registerData.profileImgUrl === profileImgUrl[2]
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setRegisterData({
                    ...registerData,
                    profileImgUrl: profileImgUrl[2],
                  })
                }
              >
                <img src={profile3} alt="profile3" />
              </div>
              <div
                className={
                  registerData.profileImgUrl === profileImgUrl[3]
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setRegisterData({
                    ...registerData,
                    profileImgUrl: profileImgUrl[3],
                  })
                }
              >
                <img src={profile4} alt="profile4" />
              </div>
              <div
                className={
                  registerData.profileImgUrl === profileImgUrl[4]
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setRegisterData({
                    ...registerData,
                    profileImgUrl: profileImgUrl[4],
                  })
                }
              >
                <img src={profile5} alt="profile5" />
              </div>
            </div>
          </ProfileFormContainer>
          <Input
            value={registerData.nickName}
            label="닉네임을 입력하세요."
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={true}
            placeholder="닉네임 (한글, 영문 10자까지)"
            onChange={(e) =>
              setRegisterData({ ...registerData, nickName: e.target.value })
            }
            style={{ background: theme.colors.neutral100 }}
          />
          <Input
            value={registerData.jobSearchStatus}
            label="현재 구직 활동 중이신가요?"
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            placeholder="선택해주세요"
            required={false}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                jobSearchStatus: e.target.value,
              })
            }
            onClick={handleTagPopper}
            readOnly
            style={{ background: theme.colors.neutral100 }}
          />
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            style={{
              width: popperWidth,
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            <CustomOptions>
              {jobStateOptions.map((item, index) => (
                <OptionItem
                  className={index === 0 ? "first" : ""}
                  onClick={() => handleOptionClick(item)}
                >
                  {item}
                </OptionItem>
              ))}
            </CustomOptions>
          </Popper>

          <Input
            value={registerData.desiredJob}
            label="희망하고 있는 직무를 입력해주세요."
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            placeholder="직무 (50자까지)"
            onChange={(e) =>
              setRegisterData({ ...registerData, desiredJob: e.target.value })
            }
            style={{ background: theme.colors.neutral100 }}
          />
          <Textarea
            value={registerData.goal}
            label="어떤 역량을 더 발전시키고 싶은가요?"
            helperText="자신의 강점, 약점을 적고 어떤 역량을 더 발전시키고 싶은지 작성해보세요."
            rows={10}
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            onChange={(e) =>
              setRegisterData({ ...registerData, goal: e.target.value })
            }
            style={{ background: theme.colors.neutral100 }}
          />
          <Textarea
            value={registerData.dream}
            label="어떤 꿈을 가지고 있으신가요?"
            helperText="평소에 가지고 있던 ‘꿈'에 대한 생각을 자유롭게 작성해주셔도 좋아요."
            rows={10}
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            onChange={(e) =>
              setRegisterData({ ...registerData, dream: e.target.value })
            }
            style={{ background: theme.colors.neutral100 }}
          />
          <MainButton
            disabled={
              isLoading ||
              !(registerData.profileImgUrl && registerData.nickName)
            }
            style={{
              borderRadius: "8px",
            }}
            onClick={handleRegister}
          >
            플라잇 시작하기
          </MainButton>
        </FormContainer>
      </Container>
      <Modal
        image={<img src={logoImg} alt="flight" width="100px" />}
        title="회원가입 완료!"
        buttons={["플라잇 시작하기"]}
        onConfirm={() => navigate(`/experience`)}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  ${(props) => props.theme.fonts.title1};
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ProfileFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .profile-label {
    ${(props) => props.theme.fonts.subtitle4};
    color: ${(props) => props.theme.colors.neutral700};
  }
  .required {
    ${(props) => props.theme.fonts.cap1};
    color: var(--sub-tertiary-800, #ffa63e);
  }
  .profile-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
  }
  .active {
    border-radius: 21px;
    border: 2px solid ${(props) => props.theme.colors.main500};
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  }
  img {
    width: 64px;
  }
`;

const CustomOptions = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.neutral300};
  background: ${(props) => props.theme.colors.neutral50};
`;

const OptionItem = styled.div`
  padding: 16px;
  ${(props) => props.theme.fonts.body4};
  color: ${(props) => props.theme.colors.neutral600};
  border-top: 1px solid ${(props) => props.theme.colors.neutral300};
  &.first {
    border-top: none;
  }
  &:hover {
    background: ${(props) => props.theme.colors.neutral400};
  }
`;

export default SignupPage;
