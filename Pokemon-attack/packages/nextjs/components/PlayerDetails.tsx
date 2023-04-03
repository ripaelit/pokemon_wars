import React from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Spinner } from "~~/components/Spinner";
import { Address } from "./scaffold-eth";

const PlayerDetails = (props: any): JSX.Element => {
    const { address, index } = props
    const { data: playerScore } = useScaffoldContractRead({
        contractName: "Game_Contract",
        functionName: "getScore",
        args: [address]
    })
    return(
        <div className="bg-transparent border-[0.5px] flex justify-around text-white font-medium text-md w-11/12 sm:w-9/12 rounded-sm mt-6"
        id={index}
        >
                {/* <p className="break-all w-[200px] lg:break-normal">{address}</p> */}
                <Address address={address} />
                <p>{playerScore?.toString()}</p>
        </div>
    )
}

export default PlayerDetails