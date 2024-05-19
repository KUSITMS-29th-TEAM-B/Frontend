import {
  FormControlLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";
import React from "react";
import { useTheme } from "styled-components";
import { TagType } from "../../types/experience";

interface RadioGroupProp {
  name: string;
  value: string;
  options: TagType[];
  onChange: (item: TagType) => void;
}

const RadioGroup = ({ name, value, options, onChange }: RadioGroupProp) => {
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = event.target.value;
    const selectedItem = options.find((item) => item.id === selectedId);
    if (selectedItem) {
      onChange({ id: selectedId, name: selectedItem.name });
    }
  };

  return (
    <MuiRadioGroup
      value={value}
      name={name}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
      onChange={handleChange}
    >
      {options.map((item) => (
        <FormControlLabel
          key={item.name}
          value={item.id}
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
          label={item.name}
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
