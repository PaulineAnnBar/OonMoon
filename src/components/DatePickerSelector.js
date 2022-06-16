import * as React from 'react';
import { useState } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function DatePickerSelector(props) {
    const [periodDate, setPeriodDate] = useState("")

    const handleChange = (value) => {
        setPeriodDate(value)
        props.onHappyTime(value)
    };

    return (
        <div>
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
            </LocalizationProvider >

        </div >

    );
}
