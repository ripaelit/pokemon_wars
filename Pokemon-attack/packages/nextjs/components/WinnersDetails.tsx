import React from "react";
import { Address } from "./scaffold-eth";
import { ethers } from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const WinnerDetails = (props: any): JSX.Element => {
    const { data: winners } = useScaffoldContractRead({
        contractName: "Game_Contract",
        functionName: "getAllWinners",
    })

    const { reward } = props
    // Convert reward from wei to ether
    const rewardInEther = reward ? ethers.utils.formatUnits(reward, "ether") : 0;

    return(
        <div className="bg-transparent border-[0.5px] flex my-2 justify-around text-white font-medium text-md w-11/12 sm:w-9/12 rounded-sm">
            {winners && winners.map((winner: string, index: number) => (
                <div key={index} className="w-full flex items-center justify-around">
                        <Address address={winner} />
                        <p>{rewardInEther} Matic</p>
                </div>
            ))}
        </div>
    )
}

export default WinnerDetails;
