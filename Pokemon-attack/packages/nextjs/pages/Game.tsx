import React from "react";
import Navbar from "~~/components/Navbar";
import Pichu from "~~/components/Pichu";
import Pikachu from "~~/components/Pikachu";
import Raichu from "~~/components/Raichu";
import Score from "~~/components/Score";
import Footer from "~~/components/scaffold-eth/Footer";
import { Spinner } from "~~/components/Spinner";
import Events from "~~/components/Events";

const Game = () => {
    return(
        <main>
            <Navbar />
            <Score />
            <Pichu />
            <EventsHeading />
            <Events />
            <Events />
            <Footer />
        </main>
    )
}

export default Game

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

  export const EventsHeading = () => {
    return(
        <div className="flex items-center flex-col py-20">
        <h1 className="text-2xl border-t-[0.5px] border-gray-400 font-semibold text-white py-2">
        Game Events
      </h1>
        </div>
    )
  }