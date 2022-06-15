import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import abi from "../utils/OonMoon.json"
import { ethers, BigNumber } from "ethers";



export default function MoodSelect(props) {
    const [mood, setMood] = React.useState(0);
    const [moodResponse, setMoodResponse] = React.useState("");
    const contractAddress = "0xEEE6A1409B5d1fcdFd8dD85892843595367939c2"
    const contractABI = abi.abi


    const moodStatus = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const oonMoonContract = new ethers.Contract(contractAddress, contractABI, signer)

                const logtxn = await oonMoonContract.logDailyData(

                    BigNumber.from(mood),
                    { gasLimit: 300000 }
                );
                console.log("mining...", logtxn.hash)
                await logtxn.wait();
                console.log("Mined -- ", logtxn.hash);
                setMoodResponse(logtxn.hash)

            } else {
                console.log("ethereum object doesn't exist")
            }
        }
        catch
        (error) {
            console.log("error: ", error)
        }
    }
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
