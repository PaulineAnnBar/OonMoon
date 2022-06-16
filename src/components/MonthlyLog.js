import * as React from "react";
import { Button } from "@mui/material";
import abi from "../utils/OonMoon.json";
import { ethers } from "ethers";
import { useState } from "react";

export default function MonthlyLog(props) {
  const [monthlyResults, setMonthlyResults] = useState("");
  const contractAddress = "0x4f6977502F7bd2E8Ff128781aAb0a2ad26EBE7dE";
  const abiContract = abi.abi;

  function createTableFromMonthlyView(monthlyViewTxn) {
    let resultString = "<table>";

    monthlyViewTxn.forEach(function (item, index) {
      resultString += "<tr><td>" + item.toString() + "</td></tr>";
      //resultString += "Day " + index + ":" + item.toString();
    });
    resultString += "</table>";
    return resultString;
  }

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
        const year = 2022;
        const month = 5;

        let monthlyViewTxn = await monthlyView.getMyMonthlyHistory(year, month);

        console.log("dailyLog output is:", monthlyViewTxn);
        const tableText = createTableFromMonthlyView(monthlyViewTxn);
        console.log("tableText is :", tableText);
        setMonthlyResults(tableText);
        document.getElementById("monthlyPeriodView").innerHTML = tableText;
      } else {
        console.log("No ethereum object!");
      }
    } catch (error) {
      console.log(`error: ${error}`);
      return "Please make sure you've selected all options!";
    }
  }


  return (
    <div>
      <div id="monthlyPeriodView" innerHTML={monthlyResults} />

      <Button
        className={"monthly-view"}
        variant="contained"
        color={"secondary"}
        onClick={getMonthlyData}
        value={monthlyResults}
        size={"large"}
      >
      </Button>
    </div>
  );
}

