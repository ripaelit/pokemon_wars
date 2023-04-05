import React from "react";

interface Props {
    winner: string;
    idx: number
}

const WinnerDetails = ({ winner, idx }: Props): JSX.Element => {
    return(
        <div className="bg-transparent border-[0.5px] flex justify-around md:justify-between text-white font-medium text-md w-11/12 sm:w-9/12 rounded-sm mt-6"
        id={idx.toString()}
        >
                <p className="break-all w-[150px] lg:break-normal md:pl-4">{winner}</p>
                <p>1</p>
                <p className="mr-28">4</p>
        </div>
    )
}

export default WinnerDetails