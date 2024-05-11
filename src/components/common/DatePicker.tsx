import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  padding: 8px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
`;

type DatePickerProps = {
  date: Date;
  setDate: (date: Date) => void;
};

const OneDatePick: React.FC<DatePickerProps> = ({ date, setDate }) => {
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
    />
  );
};

export default OneDatePick;
