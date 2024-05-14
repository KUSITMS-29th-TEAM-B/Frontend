import styled from "styled-components";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import { ChangeEvent } from "react";

interface SelectProp extends React.HTMLAttributes<HTMLSelectElement> {
  value: number;
  onChange: (evnet: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const Select = ({ options, onChange, value, ...props }: SelectProp) => {
  return (
    <StyledSelect value={options[value]} onChange={onChange}>
      {options.map((item, index) => (
        <option>
          {index + 1}. {item}
        </option>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  ${(props) => props.theme.fonts.body3};
  display: flex;
  padding: 17px 22px;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.neutral200};
  color: ${(props) => props.theme.colors.neutural600};
  appearance: none;
  background: ${(props) => props.theme.colors.neutral0} url(${ArrowDown})
    no-repeat right 0.5rem center;
  &::-webkit-scrollbar {
    display: none;
  }
  option {
    height: 41px;
    padding: 21px 11px;
    background: white;
    color: ${(props) => props.theme.colors.neutural600};
  }
`;

export default Select;
