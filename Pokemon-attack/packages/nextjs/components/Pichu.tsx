import React, { useState } from "react";
import pichu from "../public/assets/Pichu.svg";
import Image from "next/image";
import Modal from "./Modal";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import { Spinner } from "./Spinner";

const Pichu = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = useAccount();
  const { data: checkPichuBalance } = useScaffoldContractRead({
    contractName: "Game_Contract",
    functionName: "balanceOf",
    args: [address, BigNumber.from(0)]
  });
  const { writeAsync: claimLevelOnePichu, isLoading } = useScaffoldContractWrite({
    contractName: "Game_Contract",
    functionName: "claimLevelOnePickachu",
    value: "0.1"
  });

  const handleCollect = () => {
    setIsModalOpen(true)
  }

  const handleTransfer = (walletAddress: string) => {
    // Perform transfer logic here
    console.log(`Transfer to ${walletAddress} successful!`);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if(isLoading) {
    return(
      <Loading />
    )
  }

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-white font-semibold leading-6 text-xl mb-5">
        Collect a Level 1 Pichu
      </h1>
      <Image src={pichu} width="300" height="300" alt="Pichu" />
      {
        checkPichuBalance !== undefined && checkPichuBalance.toNumber() === 0 ? 
      <button
        className="bg-white text-black border-0 py-2.5 px-7 rounded-lg font-semibold leading-6 mt-5"
        onClick={() => claimLevelOnePichu()}
      >
        Collect
      </button>
        :
      <button
        className="bg-white text-black border-0 py-2.5 px-7 rounded-lg font-semibold leading-6 mt-5"
        onClick={handleCollect}
      >
        Transfer
      </button>
      }
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTransfer={handleTransfer}
        title={"Send your Pichu to Someone"}
        description={"Enter their wallet address or select a current player to transfer your Pichu to."}
        action={"Transfer"}
      />
    </div>
  );
};

export default Pichu;


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