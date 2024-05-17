import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import Check from "../../assets/icons/check.svg";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <StyledLabel htmlFor={label}>
      <StyledInput type="checkbox" id={label} name={label} {...props} />
      <StyledP>{label}</StyledP>
    </StyledLabel>
  );
};

const StyledInput = styled.input`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.colors.neutral400};
  &:checked {
    border-color: transparent;
    background-image: url(${Check});
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${(props) => props.theme.colors.main500};
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledP = styled.p`
  ${(props) => props.theme.fonts.cap2};
  color: ${(props) => props.theme.colors.neutral600};
  margin-left: 0.25rem;
`;

export default Checkbox;
