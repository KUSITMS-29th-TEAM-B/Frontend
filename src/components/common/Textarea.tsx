import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  required?: boolean;
}
const Textarea = ({ label, helperText, required, ...props }: TextareaProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <HelperText>{helperText}</HelperText>
      <InputBox {...props} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputBox = styled.textarea`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #a8a8a8;
  background: #eee;
`;

const Label = styled.div`
  ${(props) => props.theme.fonts.subtitle1};
  color: #aaaaaa;
`;

const HelperText = styled.div`
  ${(props) => props.theme.fonts.cap2};
  color: #aaaaaa;
`;

export default Textarea;
