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
      <div className="label">{label}</div>
      <div className="helperText">{helperText}</div>
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
    ${(props) => props.theme.fonts.subtitle1};
    color: #aaaaaa;
    ${(props) => props.labelStyle};
  }
  .helperText {
    ${(props) => props.theme.fonts.cap2};
    color: #aaaaaa;
    ${(props) => props.helperTextStyle};
  }
`;

const InputBox = styled.textarea`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #a8a8a8;
  background: #eee;
  resize: none;
  outline: none;
`;

export default Textarea;
