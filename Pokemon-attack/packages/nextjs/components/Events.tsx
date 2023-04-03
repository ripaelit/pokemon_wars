import React from "react";
import Pokemon from "../public/assets/Pichu.svg";
import Image from "next/image";

const Events = () => {
  return (
    <div className="flex items-center flex-col py-20">
      <h1 className="text-2xl border-t-[0.5px] border-gray-400 font-semibold text-white py-2">
        Game Events
      </h1>
      <div className="flex border-[1px] border-gray-500 rounded-md gap-0">
        <div className="border-r-[0.5px] border-gray-500">
          <Image src={Pokemon} width={64} height={64} alt="Image" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="m-1 text-[#6B7280] text-xs pl-2">
            0x7B4A8d0862F049E35078E49F2561630Fac079eB9
          </p>
          <div className="flex items-center gap-0">
            <p className="m-0 text-white text-xs font-medium mr-2 pl-2">
              destroyed
            </p>
            <p className="m-0 text-[#6B7280] text-xs pr-2">
              0x7B4A8d0862F049E35078E49F2561630Fac079eB9
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
