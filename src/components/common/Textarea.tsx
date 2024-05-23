import React, { TextareaHTMLAttributes, useRef } from "react";
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
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight(event.target);
  };

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      adjustTextareaHeight(textarea);
    }
  }, []);

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
      <InputBox {...props} ref={textareaRef} onInput={handleInput} />
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
  &.scroll::-webkit-scrollbar {
    display: none;
  }
  overflow-y: hidden;
`;

export default Textarea;
