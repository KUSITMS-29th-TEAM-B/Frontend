import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const StyledTimePicker = styled(DatePicker)`
  padding: 8px;
  margin: 10px;
  border-radius: 5px;
  background-color: #F7F7FB;
  border: none;
  font-size: 16px;
  color: #63698D;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

type TimePickerProps = {
  time: string;
  setTime: (time: string) => void;
};

const TimePicker: React.FC<TimePickerProps> = ({ time, setTime }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setTime(date.toTimeString());
    } else {
    }
  };

  return (
    <StyledTimePicker
      selected={startDate}
      onChange={handleDateChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  );
};

export default TimePicker;
