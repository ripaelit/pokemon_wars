import { useState, useEffect } from "react";
import Navbar from "~~/components/Navbar";
import Footer from "~~/components/scaffold-eth/Footer";
import WinnerDetails from "~~/components/WinnersDetails";
import { useProvider, useContract } from "wagmi";
import { CONTRACT_ADDR, ABI } from "~~/generated/hardhat_contracts";

const Leaderboards = () => {

  const [gamesArray, setGamesArray] = useState<any[]>([]);
    const provider = useProvider();
    const contract = useContract({
        address: CONTRACT_ADDR,
        abi: ABI,
        signerOrProvider: provider
    })
    
    const getGamesMap = async (id: number) => {
        try {
            const _game = await contract?.games(id);
            return _game;
        } catch (err: any) {
            console.error(err.reason);
        }
    }

    const getAllGames = async () => {
        try {
            const _gameId = await contract?.gameId();
            // maybe log it here if it throws an error
            const _gamesArray = [];
            for(let i = 0; i < _gameId.toNumber(); i++) {
              console.log(_gameId.toNumber(), "gameId here");
                const gamesMap = getGamesMap(i);
                _gamesArray.push(gamesMap);
            }
            const games = await Promise.all(_gamesArray);
            console.log(games);
            setGamesArray(games);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllGames();
    }, [gamesArray])
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
              {gamesArray && gamesArray.map((game, idx) => {
                return <WinnerDetails {...game} idx={idx} key={idx} />
              })}
            </div>
            <Footer />
        </section>
    )
}

export default Leaderboards