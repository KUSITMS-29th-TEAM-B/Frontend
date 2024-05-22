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
import { useNavigate } from "react-router-dom";
import { getUserInfo, patchUserInfo } from "../services/user";
import { UserDataType } from "../types/user";
import { getCookie } from "../services/cookie";
import { useGetUserInfo } from "../components/hooks/useGetUserInfo";

const profileImgUrl = [
  "/assets/profile1.png",
  "/assets/profile2.png",
  "/assets/profile3.png",
  "/assets/profile4.png",
  "/assets/profile5.png",
];

type ProfileUserType = Omit<UserDataType, "provider" | "email">;

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const user = getCookie("user");

  const [userData, setUserData] = React.useState<ProfileUserType>({
    profileImgUrl: "",
    nickName: "",
    jobSearchStatus: "",
    desiredJob: "",
    goal: "",
    dream: "",
  });
  const { refetch } = useGetUserInfo(user?.token);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // 팝업 위치 관리
  const [popperWidth, setPopperWidth] = React.useState(0);
  const open = Boolean(anchorEl);
  const id = open ? "tag-popper" : undefined;

  const handleTagPopper = (event: React.MouseEvent<HTMLElement>) => {
    setPopperWidth(event.currentTarget.clientWidth);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleOptionClick = (item: string) => {
    setUserData({ ...userData, jobSearchStatus: item });
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    patchUserInfo(userData, user?.token).then(() => {
      refetch();
      navigate(`/profile`);
    });
  };

  React.useEffect(() => {
    if (user?.token) {
      getUserInfo(user?.token).then((res) => {
        const {
          nickName,
          profileImgUrl,
          jobSearchStatus,
          desiredJob,
          goal,
          dream,
        } = res.data;
        setUserData({
          nickName,
          profileImgUrl,
          jobSearchStatus,
          desiredJob,
          goal,
          dream,
        });
      });
    }
  }, [user?.token]);

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
                  userData.profileImgUrl === profileImgUrl[0] ? "active" : ""
                }
                onClick={() =>
                  setUserData({
                    ...userData,
                    profileImgUrl: profileImgUrl[0],
                  })
                }
              >
                <img src={profile1} alt="profile1" />
              </div>
              <div
                className={
                  userData.profileImgUrl === profileImgUrl[1] ? "active" : ""
                }
                onClick={() =>
                  setUserData({
                    ...userData,
                    profileImgUrl: profileImgUrl[1],
                  })
                }
              >
                <img src={profile2} alt="profile2" />
              </div>
              <div
                className={
                  userData.profileImgUrl === profileImgUrl[2] ? "active" : ""
                }
                onClick={() =>
                  setUserData({
                    ...userData,
                    profileImgUrl: profileImgUrl[2],
                  })
                }
              >
                <img src={profile3} alt="profile3" />
              </div>
              <div
                className={
                  userData.profileImgUrl === profileImgUrl[3] ? "active" : ""
                }
                onClick={() =>
                  setUserData({
                    ...userData,
                    profileImgUrl: profileImgUrl[3],
                  })
                }
              >
                <img src={profile4} alt="profile4" />
              </div>
              <div
                className={
                  userData.profileImgUrl === profileImgUrl[4] ? "active" : ""
                }
                onClick={() =>
                  setUserData({
                    ...userData,
                    profileImgUrl: profileImgUrl[4],
                  })
                }
              >
                <img src={profile5} alt="profile5" />
              </div>
            </div>
          </ProfileFormContainer>
          <Input
            value={userData.nickName}
            label="닉네임을 입력하세요."
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={true}
            placeholder="닉네임 (한글, 영문 10자까지)"
            onChange={(e) =>
              setUserData({ ...userData, nickName: e.target.value })
            }
            style={{ background: theme.colors.neutral100 }}
          />
          <Input
            value={userData.jobSearchStatus}
            label="현재 구직 활동 중이신가요?"
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            placeholder="선택해주세요"
            required={false}
            onChange={(e) =>
              setUserData({
                ...userData,
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
            value={userData.desiredJob}
            label="희망하고 있는 직무를 입력해주세요."
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            placeholder="직무 (50자까지)"
            onChange={(e) =>
              setUserData({ ...userData, desiredJob: e.target.value })
            }
            style={{ background: theme.colors.neutral100 }}
          />
          <Textarea
            value={userData.goal}
            label="어떤 역량을 더 발전시키고 싶은가요?"
            helperText="자신의 강점, 약점을 적고 어떤 역량을 더 발전시키고 싶은지 작성해보세요."
            rows={10}
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            onChange={(e) => setUserData({ ...userData, goal: e.target.value })}
            style={{ background: theme.colors.neutral100 }}
          />
          <Textarea
            value={userData.dream}
            label="어떤 꿈을 가지고 있으신가요?"
            helperText="평소에 가지고 있던 ‘꿈'에 대한 생각을 자유롭게 작성해주셔도 좋아요."
            rows={10}
            labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
            required={false}
            onChange={(e) =>
              setUserData({ ...userData, dream: e.target.value })
            }
            style={{ background: theme.colors.neutral100 }}
          />
          <MainButton
            disabled={!(userData.profileImgUrl && userData.nickName)}
            style={{
              borderRadius: "8px",
            }}
            onClick={handleEditProfile}
          >
            프로필 저장
          </MainButton>
        </FormContainer>
      </Container>
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

export default ProfileEditPage;
