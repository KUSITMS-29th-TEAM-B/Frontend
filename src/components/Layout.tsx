import styled from "styled-components";

type TProps = {
  component: React.ReactNode;
};

const Layout: React.FC<TProps> = ({ component }) => {
  return (
    <div>
      <StyledDivContainer>{component}</StyledDivContainer>
    </div>
  );
};

export default Layout;

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
