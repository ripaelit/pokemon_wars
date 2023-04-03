import React from "react";
import pikachu from "../public/assets/pikachu.svg";
import Image from "next/image";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";

const Pikachu = (): JSX.Element => {
  const { address } = useAccount();
  const { writeAsync: burn } = useScaffoldContractWrite({
    contractName: "Game_Contract",
    functionName: "burn",
    args: [address, BigNumber.from(1), BigNumber.from(1)]
  })

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-white font-semibold leading-6 text-xl mb-5">
        Burn your Pikachu to get a level 3 Raichu ⚡
      </h1>
      <Image src={pikachu} width="300" height="300" alt="Pichu" />
      <button
      onClick={burn}
        className="bg-white text-black border-0 py-2.5 px-7 rounded-lg font-semibold leading-6 mt-5"
      >
        Burn
      </button>
    </div>
  );
};

export default Pikachu;
