import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const StyledTimePicker = styled(DatePicker)`
  padding: 8px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
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
