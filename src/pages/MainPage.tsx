import styled from "styled-components";
import { useRecoilState } from "recoil";
import { countState } from "../store/countStore";

const MainPage: React.FC = () => {
  const [count, setCount] = useRecoilState(countState);
  return (
    <StyledDivContainer>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </StyledDivContainer>
  );
};

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

export default MainPage;
