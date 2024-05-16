import {
  FormControlLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";
import React from "react";
import { useTheme } from "styled-components";

interface RadioGroupProp {
  name: string;
  value: string;
  options: string[];
  onChange: (item: string) => void;
}

const RadioGroup = ({ name, value, options, onChange }: RadioGroupProp) => {
  const theme = useTheme();

  return (
    <MuiRadioGroup
      value={value}
      name={name}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((item) => (
        <FormControlLabel
          value={item}
          control={
            <Radio
              sx={{
                color: theme.colors.neutral400,
                "&.Mui-checked": {
                  color: theme.colors.main500,
                },
              }}
            />
          }
          label={item}
          sx={{
            ".MuiFormControlLabel-label": {
              fontSize: "12px",
              color: theme.colors.neutral600,
            },
          }}
        />
      ))}
    </MuiRadioGroup>
  );
};

export default RadioGroup;
