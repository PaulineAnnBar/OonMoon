import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function Header() {
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            /*
            * Check if we're authorized to access the user's wallet
            */
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account)
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Please get a Metamask Wallet");
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])


    return (
        <div className={"header"}>
            <img src={"/images/logo.png"} alt="logo" />
            <div className={"header_Text"}>
                <h2 className={"header_title"}>OonMoon</h2>
                <p className={"header_subtitle"}>The only decentralised period traker</p>
            </div>

            {!currentAccount && (
                <Button variant="contained" color={"secondary"} onClick={connectWallet}>Connect Wallet</Button>
            )}
        </div>
    )
}