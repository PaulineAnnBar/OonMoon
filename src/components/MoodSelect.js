import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function MoodSelect(props) {
    const [mood, setMood] = React.useState(0);


    const handleChange = (event) => {
        props.onMoodPicker(event.target.value)
        setMood(event.target.value)
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
                    <MenuItem value={2} >It's awesome 😊</MenuItem>
                    <MenuItem value={1}>Moody 😏</MenuItem>
                    <MenuItem value={3}>Not great 😭</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
