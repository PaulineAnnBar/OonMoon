import * as React from "react";
import { useState } from "react";
import DatePickerSelector from "./DatePickerSelector";
import MoodSelect from "./MoodSelect";
import PeriodSelect from "./PeriodSelect";
import MonthlyLog from "./MonthlyLog";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import abi from "../utils/OonMoon.json";

export default function Container() {
  const [datePicker, setDatePicker] = useState("");
  const [moodPicker, setMoodPicker] = useState(0);
  const [cyclePicker, setCyclePicker] = useState(0);
  const contractAddress = "0x4f6977502F7bd2E8Ff128781aAb0a2ad26EBE7dE";
  const abiContract = abi.abi;

  const sendAllDataOnSave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const sendDailyLog = new ethers.Contract(
          contractAddress,
          abiContract,
          signer
        );
        const dateSelected = new Date(datePicker);
        console.log(`Date string is: ${datePicker}`);
        console.log(`Processed year is: ${dateSelected.getFullYear()}`);
        console.log(`Processed month is: ${dateSelected.getMonth()}`);
        console.log(`Processed day is: ${dateSelected.getDate()}`);

        let dailyLogTxn = await sendDailyLog.logDailyData(
          dateSelected.getFullYear(),
          dateSelected.getMonth(),
          dateSelected.getDate(),
          moodPicker,
          cyclePicker,
          { gasLimit: 300000 }
        );

        console.log("dailyLog", dailyLogTxn);
      } else {
        console.log("No ethereum object!");
      }
    } catch (error) {
      return "Please make sure you've selected all options!";
    }
  };

  function onDatePicker(value) {
    console.log("onDatePicker :", value);
    setDatePicker(value);
  }

  function onMoodPicker(value) {
    console.log("onMoodPicker :", value);

    setMoodPicker(value);
  }

  function onCyclePicker(value) {
    console.log("onCyclePicker :", value);

    setCyclePicker(value);
  }

  let addressProps = {
    address: contractAddress,
  };

  return (
    <div>
      <div className={"main-selectors"}>
        <div className={"big-div"}>
          <DatePickerSelector onHappyTime={onDatePicker} />
          <MoodSelect onMoodPicker={onMoodPicker} />
          <PeriodSelect onCyclePicker={onCyclePicker} />
          <Button
            className={"save_button"}
            variant="contained"
            color={"secondary"}
            onClick={sendAllDataOnSave}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="month-div">
        <MonthlyLog props={addressProps} />
      </div>
    </div>
  );
}
