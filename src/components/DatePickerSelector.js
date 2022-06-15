import * as React from 'react';
import {useState} from "react";
import DatePicker from "react-datepicker";

export default function DatePickerSelector(props) {
    const [periodDate, setPeriodDate] = useState("")
    
    const handleChange = (value) => {
        setPeriodDate(value)
        props.onHappyTime(value)
    };
    
    return (
        <div>
            <DatePicker className={"react-datepicker"}
                        placeholderText={'Select a date'}
                        selected={periodDate}
                        isClearable={true}
                        onChange={handleChange}
                        dateFormat={'yyyy/MM/dd'}
            />
        </div>
    );
}
