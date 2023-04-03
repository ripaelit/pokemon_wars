import React from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Spinner } from "~~/components/Spinner";

const PlayerDetails = (props: any): JSX.Element => {
    const { address, index } = props
    const { data: playerScore } = useScaffoldContractRead({
        contractName: "Game_Contract",
        functionName: "getScore",
        args: [address]
    })
    if(!playerScore) {
        return(
            <Loading />
        )
    }
    return(
        <div className="bg-transparent border-[0.5px] flex justify-around text-white font-medium text-md w-11/12 sm:w-9/12 rounded-sm mt-6"
        id={index}
        >
                <p className="break-all w-[200px] lg:break-normal">{address}</p>
                <p>{playerScore?.toString()}</p>
        </div>
    )
}

export default PlayerDetails

const Loading = () => {
    return (
      <div
        className="flex justify-center items-center"
        style={{
          height: "700px",
        }}
      >
        <Spinner />
      </div>
    );
  };