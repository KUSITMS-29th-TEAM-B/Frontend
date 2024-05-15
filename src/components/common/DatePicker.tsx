import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)<{ style: string }>`
  padding: 8px;
  margin: 10px;
  border-radius: 5px;
  background-color: #f7f7fb;
  border: none;
  font-size: 16px;
  width: 100%;
  &:focus {
    outline: none;
  }
  ${(props) => props.style};
`;

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  style?: string;
}

const OneDatePick: React.FC<DatePickerProps> = ({ date, setDate, style }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setDate(date);
    } else {
    }
  };

  useEffect(() => {
    setStartDate(date);
  }, [date]);

  return (
    <StyledDatePicker
      selected={startDate}
      onChange={handleDateChange}
      closeOnScroll={true}
      style={style || ""}
    />
  );
};

export default OneDatePick;
