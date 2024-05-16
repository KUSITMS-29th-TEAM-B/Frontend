import React from "react";
import styled from "styled-components";
import ExpData from "../../services/JD/ExpData";
import { useRecoilState } from "recoil";
import { detailStore } from "../../store/jdStore";
import { questions } from "../../assets/data/questions";
import Chip from "../common/Chip";

interface JobContainerProps {
  expId: number;
}

const ExperienceBox: React.FC<JobContainerProps> = ({ expId }) => {
  const expData = ExpData[expId - 1];
  const [detailId, setDetailId] = useRecoilState<number>(detailStore);

  return (
    <ExpContainer>
      <ScrollDiv>
        <ExpBottomBox>
          <div>{expData.title}</div>
          {questions.map((item, index) => (
            <div style={{ display: "flex" }}>
              <Chip text={item.type} />
              <div>{item.question}</div>
              <div>{expData.detail![index].content}</div>
            </div>
          ))}
          <button onClick={() => setDetailId(0)}>이전으로</button>
        </ExpBottomBox>
      </ScrollDiv>
    </ExpContainer>
  );
};

export default ExperienceBox;

const ScrollDiv = styled.div`
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ccc;
    }
    ::-webkit-scrollbar-track {
    }
`;

const ExpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40rem;
    align-items: flex-start;
    gap: 0.625rem;
    //padding: 2rem;
    flex-shrink: 0;
    border-radius: 0.9rem;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--neutral-0, #FFF);
    //min-height: 100rem;
`;

const ExpBottomBox = styled.div`
    height: 23rem;
    color: var(--neutral-700, #343A5D);
    //overflow-y: scroll;
    margin: 0rem 0rem 2rem 2rem;
    div {
        padding-right: 1rem;
    }
`;
