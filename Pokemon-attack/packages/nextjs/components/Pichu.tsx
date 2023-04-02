import React from "react";
import pichu from "../public/assets/Pichu.svg";
import Image from "next/image";

const Pichu = (): JSX.Element => {
    return(
        <div
        className="flex flex-col items-center py-14"
        >
            <h1 className="text-white font-semibold leading-6 text-xl mb-5">Collect a Level 1 Pichu</h1>
            <Image 
             src={pichu}
             width="300" 
             height="300"
            alt="Pichu"
            />
            <button
            className="bg-white text-black border-0 py-2.5 px-7 rounded-lg font-semibold leading-6 mt-5"
            >Collect</button>
        </div>
    )
}

export default Pichu