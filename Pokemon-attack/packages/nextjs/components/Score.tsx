import React from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { ethers } from "ethers";

const Score = () => {
    const { address: connectedAddress } = useAccount();
    const { data: currentGame } = useScaffoldContractRead({
        contractName: "Game_Contract",
        functionName: "gameId"
    })

    const { data: rewardAmount } = useScaffoldContractRead({
        contractName: "Game_Contract",
        functionName: "getContractBalance"
    })

    const { data: connectedPlayerScore } = useScaffoldContractRead({
       contractName: "Game_Contract",
       functionName: "getScore",
       args: [connectedAddress] 
    })
    let rewardAmountInEther: string | undefined;
    if(rewardAmount) {
        rewardAmountInEther = ethers.utils.formatEther(rewardAmount);
    }
    return(
        <div
        className="flex justify-between px-20 pt-10 text-white text-3xl"
        >
            <h1>Score: {connectedPlayerScore?.toString()}</h1>
            <h1 className="animate-bounce">🎰 Jackpot : {rewardAmountInEther} Matic</h1>
            <h1>Game: {currentGame?.toString()}</h1>
        </div>
    )
}

export default Score