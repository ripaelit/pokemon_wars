import React from "react";
import pokemonWars from "../public/assets/hero.png";
import Image from "next/image";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";


const NewGame = (): JSX.Element => {
  const { writeAsync: startNewGame } = useScaffoldContractWrite({
    contractName: "Game_Contract",
    functionName: "startNewGame",
  })
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-white font-semibold leading-6 text-2xl mb-5">
        Start a new game to play
      </h1>
      <Image src={pokemonWars} width="350" height="350" alt="Pichu" />
      <button
      onClick={startNewGame}
        className="bg-white text-black border-0 py-2.5 px-7 rounded-lg font-semibold leading-6 mt-5"
      >
        Start Game
      </button>
    </div>
  );
};

export default NewGame;
