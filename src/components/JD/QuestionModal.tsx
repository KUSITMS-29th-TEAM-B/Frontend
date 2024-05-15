import React, { FC } from "react";
import styled from "styled-components";
import warning from "../../assets/icons/icon_delete_warning.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
}

const QuestionModal: FC<ModalProps> = ({ isOpen, onClose, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <ModalWrapper>
        <MainWrapper>
          <img src={warning} alt="warning" />
          <div className="maintext">해당 문항을 삭제하시겠어요?</div>
          <div className="subtext">
            삭제된 문항은 복구할 수 없어요.<div>신중히 생각해주세요.</div>
          </div>
        </MainWrapper>
        <ButtonWrapper>
          <CloseButton onClick={onCancel}>
            <div>취소</div>
          </CloseButton>
          <ConfirmButton onClick={onClose}>
            <div>네, 삭제할게요</div>
          </ConfirmButton>
        </ButtonWrapper>
      </ModalWrapper>
    </Overlay>
  );
};

export default QuestionModal;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalWrapper = styled.div`
    position: relative;
    max-width: 30rem;
    height: 21rem;
    border-radius: 1.25rem;
    background: #FFF;
    width: 100%;
`;

const MainWrapper = styled.div`
    width: 30rem;
    height: 21rem;
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;
    align-items: center;
    flex-direction: column;
    .maintext {
        color: var(--neutral-700, #343A5D);
        text-align: center;
        font-size: 1.375rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.625rem;
        letter-spacing: -0.055rem;
        margin-top: 1.25rem;
    }
    .subtext {
        color: var(--neutral-500, #A6AAC0);
        text-align: center;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem;
        letter-spacing: -0.02rem;
    }
`;

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const ConfirmButton = styled.div`
    width: 15rem;
    height: 4.5rem;
    flex-shrink: 0;
    border-radius: 0rem 0rem 1.25rem 0rem;
    background: var(--main-500, #7D82FF);
    display: flex;
    justify-content: center;
    div {
        display: flex;
        align-items: center;
        color: var(--neutral-0, #FFF);  
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 600;
        line-height: 140%; 
        letter-spacing: -0.0375rem;
    }
`;

const CloseButton = styled.div`
    width: 15rem;
    height: 4.5rem;
    flex-shrink: 0;
    border-radius: 0rem 0rem 0rem 1.25rem;
    background: var(--neutral-400, #D9DBE6);
    display: flex;
    justify-content: center;
    div {
        display: flex;
        align-items: center;
        color: var(--neutral-600, #63698D);
        text-align: center;
        font-family: Pretendard;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 600;
        line-height: 140%;
        letter-spacing: -0.0375rem;
    }
`;
