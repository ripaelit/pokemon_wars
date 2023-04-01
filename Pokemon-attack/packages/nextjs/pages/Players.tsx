import React from "react";
import Navbar from "~~/components/Navbar";

const Players = () => {
    return(
        <section>
            <Navbar />
            <h1
            className="text-center py-10 text-white text-3xl font-semibold"
            >Players</h1>
            <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#7B4FFF] to-[#FF8F9D] flex justify-around text-white font-medium text-md w-9/12 rounded-sm">
                <p>Address</p>
                <p>Score</p>
            </div>
            {/* Component here */}
            </div>
        </section>
    )
}

export default Players