import React from "react";
import Navbar from "~~/components/Navbar";
import Pichu from "~~/components/Pichu";
import Pikachu from "~~/components/Pikachu";
import Raichu from "~~/components/Raichu";
import Score from "~~/components/Score";
import Footer from "~~/components/scaffold-eth/Footer";
import { Spinner } from "~~/components/Spinner";

const Game = () => {
    return(
        <main>
            <Navbar />
            <Score />
            <Pichu />
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