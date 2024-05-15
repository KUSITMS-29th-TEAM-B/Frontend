import React, { FC } from "react";
import styled from "styled-components";

interface ModalProps {
  image?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttons?: string[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal: FC<ModalProps> = ({
  image,
  title,
  description,
  buttons,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <ModalWrapper>
        <MainWrapper>
          {image}
          <div className="maintext">{title}</div>
          <div className="subtext">{description}</div>
        </MainWrapper>
        <ButtonWrapper>
          {buttons &&
            onConfirm &&
            (buttons?.length === 2 ? (
              <>
                <CloseButton onClick={onClose}>
                  <div>{buttons[0]}</div>
                </CloseButton>
                <ConfirmButton onClick={() => onConfirm()}>
                  <div>{buttons[1]}</div>
                </ConfirmButton>
              </>
            ) : (
              <ConfirmButton className="single" onClick={() => onConfirm()}>
                <div>{buttons[0]}</div>
              </ConfirmButton>
            ))}
        </ButtonWrapper>
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal;

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
  background: #fff;
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
    color: var(--neutral-700, #343a5d);
    text-align: center;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.625rem;
    letter-spacing: -0.055rem;
    margin-top: 1.25rem;
  }
  .subtext {
    color: var(--neutral-500, #a6aac0);
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.02rem;
    margin-top: 1.25rem;
    span {
      color: var(--main-500, #7d82ff);
      font-size: 1.2rem;
      font-weight: 600;
    }
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
  width: 100%;
  height: 4.5rem;
  flex-shrink: 0;
  border-radius: 0rem 0rem 1.25rem 0rem;
  background: var(--main-500, #7d82ff);
  display: flex;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    color: var(--neutral-0, #fff);
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.0375rem;
  }
  &.single {
    border-radius: 0rem 0rem 1.25rem 1.25rem;
  }
`;

const CloseButton = styled.div`
  width: 100%;
  height: 4.5rem;
  flex-shrink: 0;
  border-radius: 0rem 0rem 0rem 1.25rem;
  background: var(--neutral-400, #d9dbe6);
  display: flex;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    color: var(--neutral-600, #63698d);
    text-align: center;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.0375rem;
  }
`;
