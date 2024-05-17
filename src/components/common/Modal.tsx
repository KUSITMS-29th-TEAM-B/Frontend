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
          {description && <div className="subtext">{description}</div>}
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
  border-radius: 1.25rem;
  background: #fff;
  width: 100%;
`;

const MainWrapper = styled.div`
  padding: 40px 0px;
  width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .maintext {
    ${(props) => props.theme.fonts.title3};
    color: ${(props) => props.theme.colors.neutral700};
    text-align: center;
    margin-top: 2rem;
  }
  .subtext {
    ${(props) => props.theme.fonts.body3};
    color: ${(props) => props.theme.colors.neutral700};
    text-align: center;
    margin-top: 1.25rem;
    span {
      color: ${(props) => props.theme.colors.main500};
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ConfirmButton = styled.div`
  width: 50%;
  height: 4.5rem;
  flex-shrink: 0;
  border-radius: 0rem 0rem 1.25rem 0rem;
  background: ${(props) => props.theme.colors.main500};
  display: flex;
  justify-content: center;
  div {
    ${(props) => props.theme.fonts.title3};
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.neutral0};
  }
  &.single {
    width: 100%;
    border-radius: 0rem 0rem 1.25rem 1.25rem;
  }
`;

const CloseButton = styled.div`
  width: 50%;
  height: 4.5rem;
  flex-shrink: 0;
  border-radius: 0rem 0rem 0rem 1.25rem;
  background: ${(props) => props.theme.colors.neutral400};
  display: flex;
  justify-content: center;
  div {
    ${(props) => props.theme.fonts.title3};
    color: ${(props) => props.theme.colors.neutral600};
    display: flex;
    align-items: center;
    text-align: center;
  }
`;
