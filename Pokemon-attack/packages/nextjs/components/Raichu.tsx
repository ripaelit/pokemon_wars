import React, { useState } from "react";
import pichu from "../public/assets/Pichu.svg";
import Image from "next/image";
import Modal from "./Modal";

const Pichu = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCollect = () => {
    setIsModalOpen(true);
  };

  const handleTransfer = (walletAddress: string) => {
    // Perform transfer logic here
    console.log(`Transfer to ${walletAddress} successful!`);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-white font-semibold leading-6 text-xl mb-5">
        Collect a Level 1 Pichu
      </h1>
      <Image src={pichu} width="300" height="300" alt="Pichu" />
      <button
        className="bg-white text-black border-0 py-2.5 px-7 rounded-lg font-semibold leading-6 mt-5"
        onClick={handleCollect}
      >
        Collect
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTransfer={handleTransfer}
      />
    </div>
  );
};

export default Pichu;
