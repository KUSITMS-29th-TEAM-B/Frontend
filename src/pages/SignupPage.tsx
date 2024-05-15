import styled from "styled-components";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import MainButton from "../components/common/MainButton";

const SignupPage = () => {
  return (
    <Container className="page">
      <Title>회원가입</Title>
      <FormContainer>
        <Input label="닉네임을 입력하세요" />
        <Input label="현재 구직 활동 중이신가요?" placeholder="선택해주세요" />
        <Input label="희망하고 있는 직무를 입력해주세요." />
        <Textarea
          label="어떤 역량을 더 발전시키고 싶은가요?"
          helperText="자신의 강점, 약점을 적고 어떤 역량을 더 발전시키고 싶은지 작성해보세요."
          rows={10}
        />
        <Textarea
          label="어떤 꿈을 가지고 있으신가요?"
          helperText="평소에 가지고 있던 ‘꿈'에 대한 생각을 자유롭게 작성해주셔도 좋아요."
          rows={10}
        />
        <MainButton style={{ borderRadius: "6.18px", background: "#D9D9D9" }}>
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

export default SignupPage;