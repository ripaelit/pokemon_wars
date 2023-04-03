import React, { useState } from "react";
import raichu from "../public/assets/Raichu.svg";
import Image from "next/image";
import Modal from "./Modal";

const Raichu = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
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
        Time to attack other Pokemons 🔥
      </h1>
      <Image src={raichu} width="300" height="300" alt="Pichu" />
      <button
        className="bg-white text-black border-0 py-2.5 px-7 rounded-lg font-semibold leading-6 mt-5"
        onClick={handleOpenModal}
      >
        Attack
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTransfer={handleTransfer}
        title={"It's time to Attack"}
        description={"Enter their wallet address or select a current player to attack"}
        action={"Attack"}
      />
    </div>
  );
};

export default Raichu;
