import React from "react";
import Navbar from "~~/components/Navbar";
import Footer from "~~/components/scaffold-eth/Footer";
import WinnerDetails from "~~/components/WinnersDetails";
import { Spinner } from "~~/components/Spinner";

const Leaderboards = () => {
    return(
        <section className="min-h-screen">
            <Navbar />
            <h1
            className="text-center py-10 text-white text-3xl font-semibold"
            >Winners</h1>
            <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#7B4FFF] to-[#FF8F9D] flex justify-around text-white font-medium text-md w-11/12 sm:w-9/12 rounded-sm">
                <p className="lg:ml-10">Address</p>
                <p className="lg:ml-32">Game</p>
                <p className="lg:ml-32">Amount Won</p>
            </div>
            </div>
            <div className="flex flex-col items-center">
                {/* WinnerDetails */}
                <WinnerDetails />
            </div>
            <Footer />
        </section>
    )
}

export default Leaderboards

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
}