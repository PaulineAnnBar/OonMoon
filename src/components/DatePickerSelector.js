import * as React from "react";
import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";

export default function DatePickerSelector(props) {
  const [periodDate, setPeriodDate] = useState("");

  const handleChange = (value) => {
    setPeriodDate(value);
    props.onHappyTime(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 199 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Select a date"
              inputFormat="MM/dd/yyyy"
              value={periodDate}
              isClearable={true}
              onChange={handleChange}
              renderInput={(value) => <TextField {...value} />}
            />
          </Stack>
        </LocalizationProvider>
      </FormControl>
    </div>
  );
}
