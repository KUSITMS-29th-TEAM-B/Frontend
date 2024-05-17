import styled from "styled-components";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import MainButton from "../components/common/MainButton";
import { theme } from "../styles/theme";

const ProfileEditPage = () => {
  return (
    <Container className="page">
      <Title>프로필 수정</Title>
      <FormContainer>
        <Input
          label="닉네임을 입력하세요"
          labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
          required={true}
          placeholder="닉네임 (한글, 영문 10자까지)"
        />
        <Input
          label="현재 구직 활동 중이신가요?"
          labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
          placeholder="선택해주세요"
          required={false}
        />
        <Input
          label="희망하고 있는 직무를 입력해주세요."
          labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
          required={false}
          placeholder="직무 (50자까지)"
        />
        <Textarea
          label="어떤 역량을 더 발전시키고 싶은가요?"
          helperText="자신의 강점, 약점을 적고 어떤 역량을 더 발전시키고 싶은지 작성해보세요."
          rows={10}
          labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
          required={false}
        />
        <Textarea
          label="어떤 꿈을 가지고 있으신가요?"
          helperText="평소에 가지고 있던 ‘꿈'에 대한 생각을 자유롭게 작성해주셔도 좋아요."
          rows={10}
          labelStyle={`${theme.fonts.subtitle4}; color: ${theme.colors.neutral700}`}
          required={false}
        />
        <MainButton
          style={{
            borderRadius: "8px",
            background: theme.colors.neutral500,
          }}
        >
          플라잇 시작하기
        </MainButton>
      </FormContainer>
    </Container>
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
  max-width: 476px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export default ProfileEditPage;
