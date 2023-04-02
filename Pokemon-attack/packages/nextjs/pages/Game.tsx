import React from "react";
import Navbar from "~~/components/Navbar";
import Pichu from "~~/components/Pichu";
import Pikachu from "~~/components/Pikachu";
import Score from "~~/components/Score";
import Footer from "~~/components/scaffold-eth/Footer";

const Game = () => {
    return(
        <main>
            <Navbar />
            <Score />
            <Pichu />
            <Pikachu />
        </main>
    )
}

export default Game