import * as React from "react";
import { Button } from "@mui/material";
import abi from "../utils/OonMoon.json";
import { ethers } from "ethers";
import { useState } from "react";

export default function MonthlyLog(props) {
  const [contractAddress, setAddress] = useState("");
  const [monthlylogs, setMonthlyLogs] = useState([]);
  const [dateCurrent, setDateCurrent] = useState(new Date());
  const abiContract = abi.abi;

  console.log(`contract Address is ${props.props.address}`);

  useState(() => {
    setAddress(props.props.address);
  }, [props.props.address]);

  useState(() => {
    const dateNew = new Date(props.year, props.month)
    setDateCurrent(dateNew);
  }, [props.year, props.month]);

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


        const logs = await monthlyView.getMyMonthlyHistory(props.year, props.month);
        console.log(logs)
        setMonthlyLogs(logs)


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
  const getMoodAsString = (value) => {
    if (value === 1)
      return "Moody"
    if (value === 2)
      return "It's awesome"
    return "Not great"
  }

  const getPeriodAsString = (value) => {
    if (value === 1)
      return "Not on my period"
    if (value === 2)
      return "Period"
    return "Break through bleeding"
  }
  const getPeriodDate = (value) => {
    const formatedDay = new Date(props.year, props.month, value + 1)
    return formatedDay.toLocaleDateString("en")
  }

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
          )
        })}</table>
    </div>
  );
}
