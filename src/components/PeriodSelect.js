import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function getPeriodOptions() {
  const periodOptions = new Map();
  periodOptions[0] = "N/A";
  periodOptions[1] = "Not on my period";
  periodOptions[2] = "Period";
  periodOptions[3] = "Break through bleeding";
  return periodOptions;
}

export default function PeriodSelect(props) {
  const [period, setPeriod] = React.useState("");

  const periodOptions = getPeriodOptions();

  const handleChange = (event) => {
    setPeriod(event.target.value);
    props.onCyclePicker(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 199 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Cycle</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={period}
          onChange={handleChange}
          autoWidth
          label="Cycle"
        >
          <MenuItem value="Cycle">
            <em>Period status :</em>
          </MenuItem>
          <MenuItem value={1}>{periodOptions[1]}</MenuItem>
          <MenuItem value={2}>{periodOptions[2]}</MenuItem>
          <MenuItem value={3}>{periodOptions[3]}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
