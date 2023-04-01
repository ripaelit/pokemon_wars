import React from "react";
import Navbar from "~~/components/Navbar";
import PlayerDetails from "~~/components/PlayerDetails";
import Footer from "~~/components/scaffold-eth/Footer";

const Players = () => {
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
            {/* Component here */}
            </div>
            <div className="flex flex-col items-center">
            <PlayerDetails />
            <PlayerDetails />
            </div>
            <Footer />
        </section>
    )
}

export default Players