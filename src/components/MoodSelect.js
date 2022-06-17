import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function getMoodOptions() {
  const moodOptions = new Map();
  moodOptions[0] = "N/A";
  moodOptions[1] = "Neutral Mood 😏";
  moodOptions[2] = "It's awesome 😊";
  moodOptions[3] = "Moody! 😭";
  return moodOptions;
}

export default function MoodSelect(props) {
  const [mood, setMood] = React.useState(0);

  const moodOptions = getMoodOptions();

  const handleChange = (event) => {
    console.log(
      `mood Value was ${event.target.value} which maps to ${
        moodOptions[event.target.value]
      }`
    );
    props.onMoodPicker(event.target.value);
    setMood(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Mood</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="mood"
          value={mood}
          onChange={handleChange}
          autoWidth
          label="Mood"
        >
          <MenuItem defaultValue="Select your mood">
            <em>Select your mood :</em>
          </MenuItem>
          <MenuItem value={2}>{moodOptions[2]}</MenuItem>
          <MenuItem value={1}>{moodOptions[1]}</MenuItem>
          <MenuItem value={3}>{moodOptions[3]}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
