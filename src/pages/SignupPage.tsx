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
import { userInfo } from "../store/userInfo";
import { useRecoilState } from "recoil";

const SignupPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfo);
  const [profile, setProfile] = React.useState<number | null>(null);
  const [nickname, setNickname] = React.useState("");
  const [jobState, setJobState] = React.useState("");
  const [jobs, setJobs] = React.useState("");
  const [abilities, setAbilities] = React.useState("");
  const [dreams, setDreams] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false); // 저장 모달

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // 팝업 위치 관리
  const [popperWidth, setPopperWidth] = React.useState(0);
  const open = Boolean(anchorEl);
  const id = open ? "tag-popper" : undefined;

  // 모달 관리
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleTagPopper = (event: React.MouseEvent<HTMLElement>) => {
    setPopperWidth(event.currentTarget.clientWidth);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleOptionClick = (item: string) => {
    setJobState(item);
    setAnchorEl(null);
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
                className={profile === 1 ? "active" : ""}
                onClick={() => setProfile(1)}
              >
                <img src={profile1} alt="profile1" />
              </div>
              <div
                className={profile === 2 ? "active" : ""}
                onClick={() => setProfile(2)}
              >
                <img src={profile2} alt="profile2" />
              </div>
              <div
                className={profile === 3 ? "active" : ""}
                onClick={() => setProfile(3)}
              >
                <img src={profile3} alt="profile3" />
              </div>
              <div
                className={profile === 4 ? "active" : ""}
                onClick={() => setProfile(4)}
              >
                <img src={profile4} alt="profile4" />
              </div>
              <div
                className={profile === 5 ? "active" : ""}
                onClick={() => setProfile(5)}
              >
                <img src={profile5} alt="profile5" />
              </div>
            </div>
          </ProfileFormContainer>
          <Input
            value={nickname}
            label="닉네임을 입력하세요."
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={true}
            placeholder="닉네임 (한글, 영문 10자까지)"
            onChange={(e) => setNickname(e.target.value)}
            style={{ background: theme.colors.neutral100 }}
          />
          <Input
            value={jobState}
            label="현재 구직 활동 중이신가요?"
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            placeholder="선택해주세요"
            required={false}
            onChange={(e) => setJobState(e.target.value)}
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
            value={jobs}
            label="희망하고 있는 직무를 입력해주세요."
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            placeholder="직무 (50자까지)"
            onChange={(e) => setJobs(e.target.value)}
            style={{ background: theme.colors.neutral100 }}
          />
          <Textarea
            value={abilities}
            label="어떤 역량을 더 발전시키고 싶은가요?"
            helperText="자신의 강점, 약점을 적고 어떤 역량을 더 발전시키고 싶은지 작성해보세요."
            rows={10}
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            onChange={(e) => setAbilities(e.target.value)}
            style={{ background: theme.colors.neutral100 }}
          />
          <Textarea
            value={dreams}
            label="어떤 꿈을 가지고 있으신가요?"
            helperText="평소에 가지고 있던 ‘꿈'에 대한 생각을 자유롭게 작성해주셔도 좋아요."
            rows={10}
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            onChange={(e) => setDreams(e.target.value)}
            style={{ background: theme.colors.neutral100 }}
          />
          <MainButton
            style={{
              borderRadius: "8px",
              background: theme.colors.neutral500,
            }}
            onClick={openModal}
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
