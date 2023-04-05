import React from "react";

const WinnerDetails = (props: any): JSX.Element => {
    const { idx, winner, reward } = props
    return(
        <div className="bg-transparent border-[0.5px] flex justify-around md:justify-between text-white font-medium text-md w-11/12 sm:w-9/12 rounded-sm mt-6"
        id={idx.toString()}
        >
                <p className="break-all w-[150px] lg:break-normal md:pl-4">{winner}</p>
                <p className="mr-28">{idx}</p>
                <p>{reward}</p>
        </div>
    )
}

export default WinnerDetails