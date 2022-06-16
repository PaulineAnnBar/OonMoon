import * as React from "react";
import { Button } from "@mui/material";
import abi from "../utils/OonMoon.json";
import { ethers } from "ethers";
import { useState } from "react";

export default function MonthlyLog() {
  const [monthlyResults, setMonthlyResults] = useState("");
  const contractAddress = "0x4f6977502F7bd2E8Ff128781aAb0a2ad26EBE7dE";
  const abiContract = abi.abi;

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

        setMonthlyResults(monthlyViewTxn);
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
      <div id="monthlyPeriodView">{monthlyResults}</div>

      <Button
        className={"save_button"}
        variant="contained"
        color={"secondary"}
        onClick={getMonthlyData}
        size={"large"}
      >
        Monthly View
      </Button>
    </div>
  );
}
