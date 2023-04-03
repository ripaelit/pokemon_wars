import React from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Score = () => {
    const { address: connectedAddress } = useAccount();
    const { data: currentGame } = useScaffoldContractRead({
        contractName: "Game_Contract",
        functionName: "gameId"
    })

    const { data: connectedPlayerScore } = useScaffoldContractRead({
       contractName: "Game_Contract",
       functionName: "getScore",
       args: [connectedAddress] 
    }) 

    return(
        <div
        className="flex justify-between px-20 pt-10 text-white text-3xl"
        >
            <h1>Score: {connectedPlayerScore?.toString()}</h1>
            <h1>Game: {currentGame?.toString()}</h1>
        </div>
    )
}

export default Score