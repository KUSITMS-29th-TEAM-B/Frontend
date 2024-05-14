import React from "react";
import styled from "styled-components";
import { PolygonRight, PolygonLeft } from "../../assets";

interface YearSelectProp {
  value: number | null;
  options: number[];
  onChange: (value: number | null) => void;
}

const YearSelect = ({ value, options, onChange }: YearSelectProp) => {
  const valueIdx = options?.indexOf(value || options[0]);

  const goNext = () => {
    onChange(options[valueIdx - 1]);
  };

  const goPrev = () => {
    onChange(options[valueIdx + 1]);
  };

  return (
    <StyledSelect>
      <button onClick={() => goNext()} disabled={valueIdx === 0}>
        <PolygonLeft />
      </button>
      {options[valueIdx]}
      <button
        onClick={() => goPrev()}
        disabled={valueIdx === options.length - 1}
      >
        <PolygonRight />
      </button>
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  ${(props) => props.theme.fonts.body2};
  color: ${(props) => props.theme.fonts.neutral600};
  border-top: 1px solid #d9dbe6;
  border-bottom: 1px solid #d9dbe6;
  padding: 17px 19px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  button {
    background: none;
    border: none;
  }
`;

export default YearSelect;
