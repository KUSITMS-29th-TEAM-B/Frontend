import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  required?: boolean;
  labelStyle?: string;
  helperTextStyle?: string;
}
const Textarea = ({
  label,
  helperText,
  required,
  labelStyle,
  helperTextStyle,
  ...props
}: TextareaProps) => {
  return (
    <InputContainer labelStyle={labelStyle} helperTextStyle={helperTextStyle}>
      {label && (
        <div className="label">
          <div className="label-text">{label}</div>
          {required !== undefined && (
            <div className="required">{required ? "*" : "(선택)"}</div>
          )}
        </div>
      )}
      {helperText && <div className="helperText">{helperText}</div>}
      <InputBox {...props} />
    </InputContainer>
  );
};

const InputContainer = styled.div<{
  labelStyle?: string;
  helperTextStyle?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .label-text {
    ${(props) => props.theme.fonts.subtitle1};
    color: #aaaaaa;
    ${(props) => props.labelStyle};
  }
  .helperText {
    ${(props) => props.theme.fonts.cap2};
    color: #aaaaaa;
    ${(props) => props.helperTextStyle};
  }
  .required {
    ${(props) => props.theme.fonts.cap1};
    color: var(--sub-tertiary-800, #ffa63e);
  }
`;

const InputBox = styled.textarea`
  resize: none;
  outline: none;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.neutral400};
  background: ${(props) => props.theme.colors.neutral50};
  &:hover,
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.main500};
    padding: 15px;
  }
`;

export default Textarea;
