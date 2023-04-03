import { BigNumber } from "ethers";
import React from "react";
import Navbar from "~~/components/Navbar";
import PlayerDetails from "~~/components/PlayerDetails";
import Footer from "~~/components/scaffold-eth/Footer";
import { Spinner } from "~~/components/Spinner";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Players = () => {
  const { data: gameId } = useScaffoldContractRead({
    contractName: "Game_Contract",
    functionName: "gameId"
  })

  console.log(gameId)

  const { data: allPlayers } = useScaffoldContractRead({
    contractName: "Game_Contract",
    functionName: "getPlayers",
    args: [gameId]
  })
    return(
        <section className="min-h-screen">
            <Navbar />
            <h1
            className="text-center py-10 text-white text-3xl font-semibold"
            >Players</h1>
            <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#7B4FFF] to-[#FF8F9D] flex justify-around text-white font-medium text-md w-11/12 sm:w-9/12 rounded-sm">
                <p className="lg:ml-10">Address</p>
                <p className="lg:ml-32">Score</p>
            </div>
            </div>
            {allPlayers && allPlayers?.length > 0 && (
              <div className="flex flex-col items-center">
                {allPlayers.map((player, idx) => {
                  return <PlayerDetails address={player} index={idx} />
                })}
              </div>
            )}
            <Footer />
        </section>
    )
}

export default Players

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