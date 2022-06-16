import * as React from "react";
import { Button } from "@mui/material";
import abi from "../utils/OonMoon.json";
import { ethers } from "ethers";
import { useState } from "react";

export default function MonthlyLog(props) {
  const [contractAddress, setAddress] = useState("");
  const [monthlyResults, setMonthlyResults] = useState("");
  const abiContract = abi.abi;

  console.log(`contract Address is ${props.props.address}`);

  useState(() => {
    setAddress(props.props.address);
  }, [props.props.address]);

  function createTableFromMonthlyView(monthlyViewTxn) {
    let resultString = "<table>";

    monthlyViewTxn.forEach(function (item, index) {
      if (
        index === 0 ||
        index === 7 ||
        index === 14 ||
        index === 21 ||
        index === 28
      ) {
        resultString += "<tr>";
      }
      resultString += "<td>" + item.toString() + "</td>";
      if (
        index === 6 ||
        index === 13 ||
        index === 20 ||
        index === 27 ||
        index === 30
      ) {
        resultString += "</tr>";
      }
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
  };

  return (
    <div>
      <div id="monthlyPeriodView" innerHTML={monthlyResults} />

      <Button
        className={"monthly_view_button"}
        variant="contained"
        color={"secondary"}
        onClick={getMonthlyData}
        value="Get Monthly Data"
      >
        Get Monthly Data
      </Button>
    </div>
  );
}
