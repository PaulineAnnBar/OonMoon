import * as React from "react";
import { Button } from "@mui/material";
import abi from "../utils/OonMoon.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { getMoodOptions } from "./MoodSelect";
import { getPeriodOptions } from "./PeriodSelect";

export default function MonthlyLog(props) {
  const [contractAddress, setAddress] = useState("");
  const [dateCurrent, setDateCurrent] = useState(new Date());
  const [monthlylogs, setMonthlyLogs] = useState([]);
  const abiContract = abi.abi;

  console.log(`contract Address is ${props.props.address}`);

  useState(() => {
    setAddress(props.props.address);
  }, [props.props.address]);

  useState(() => {
    const dateNew = new Date(props.year, props.month);
    setDateCurrent(dateNew);
  }, [props.year, props.month]);

  const moodOptions = getMoodOptions();
  const periodOptions = getPeriodOptions();

  const getMonthlyData = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const monthlyView = new ethers.Contract(
          contractAddress,
          abiContract,
          signer
        );

        const logs = await monthlyView.getMyMonthlyHistory(
          props.year,
          props.month
        );
        console.log(logs);
        setMonthlyLogs(logs);

        // console.log("dailyLog output is:", monthlyViewTxn);
        // const tableText = createTableFromMonthlyView(monthlyViewTxn);
        // console.log("tableText is :", tableText);
        // setMonthlyResults(tableText);
        // document.getElementById("monthlyPeriodView").innerHTML = tableText;
      } else {
        console.log("No ethereum object!");
      }
    } catch (error) {
      console.log(`error: ${error}`);
      return "Please make sure you've selected all options!";
    }
  };

  useEffect(() => {
    console.log("loaded");
    //getMonthlyData();
  });

  const getMoodAsString = (value) => {
    return moodOptions[value];
  };

  const getPeriodAsString = (value) => {
    return periodOptions[value];
  };
  const getPeriodDate = (value) => {
    const formatedDay = new Date(props.year, props.month, value + 1);
    return formatedDay.toLocaleDateString("en");
  };

  return (
    <div>
      {/* <div id="monthlyPeriodView" innerHTML={monthlyResults} /> */}
      <Button
        className={"monthly_view_button"}
        variant="contained"
        color={"secondary"}
        onClick={getMonthlyData}
        value="Get Monthly Data"
      >
        Get Monthly Data
      </Button>
      <table>
        <tr>
          <th>Date</th>
          <th>Mood</th>
          <th>Period Status</th>
        </tr>
        {monthlylogs.map((log, index) => {
          return (
            <tr key={index}>
              <td>{getPeriodDate(index)}</td>
              <td>{getMoodAsString(log.moodFlag)}</td>
              <td>{getPeriodAsString(log.periodFlag)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
