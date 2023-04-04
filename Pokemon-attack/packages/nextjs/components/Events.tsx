// import React from "react";
// import Pokemon from "../public/assets/Pichu.svg";
// import Image from "next/image";
// import { useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

// const Events = () => {
//   useScaffoldEventSubscriber({
//     contractName: "Game_Contract",
//     eventName: "LevelUp",
//     listener: (account, level) => {
//       console.log("Account address", account);
//       console.log("Level", level);
//     },
//     once: true,
//   });

//   useScaffoldEventSubscriber({
//     contractName: "Game_Contract",
//     eventName: "BattleBegins",
//     listener: (starter, id, timestamp) => {
//       console.log("starter", starter);
//       console.log("id", id);
//       console.log("timestamp", timestamp);
//     }
//   })
  
//   useScaffoldEventSubscriber({
//     contractName: "Game_Contract",
//     eventName: "BattleWon",
//     listener : (attacker, victim, level, timestamp) => {
//       console.log("attacker: ", attacker);
//       console.log("victim: ", victim);
//       console.log("level: ", level);
//       console.log("timestamp: ", timestamp)
//     },
//     once: true
//   })

//   useScaffoldEventSubscriber({
//     contractName: "Game_Contract",
//     eventName: "BattleBegins",
//     listener: (starter, id, timestamp) => {
//       console.log("starter", starter)
//       console.log("id", id)
//       console.log("timestamp", timestamp)
//     },
//     once: true
//   })
//   return (
//     <div className="flex items-center flex-col py-2">
//       <div className="flex border-[1px] border-gray-500 rounded-md gap-0">
//         <div className="border-r-[0.5px] border-gray-500">
//           <Image src={Pokemon} width={64} height={64} alt="Image" />
//         </div>
//         <div className="flex flex-col gap-3">
//           <p className="m-1 text-[#6B7280] text-xs pl-2">
//             0x7B4A8d0862F049E35078E49F2561630Fac079eB9
//           </p>
//           <div className="flex items-center gap-0">
//             <p className="m-0 text-white text-xs font-medium mr-2 pl-2">
//               destroyed
//             </p>
//             <p className="m-0 text-[#6B7280] text-xs pr-2">
//               0x7B4A8d0862F049E35078E49F2561630Fac079eB9
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;

import React, { useState, useEffect } from "react";
import Pokemon from "../public/assets/Pichu.svg";
import Image from "next/image";
import { useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { Address } from "./scaffold-eth";

const Events = () => {

  interface LevelUpEventState {
    account: string;
    level: BigNumber;
  }
  
  interface BattleBeginsEventState {
    starter: string;
    id: BigNumber;
    timestamp: BigNumber;
  }
  
  interface BattleWonEventState {
    attacker: string;
    victim: string;
    level: BigNumber;
    timestamp: BigNumber;
  }

  const [levelUpEvents, setLevelUpEvents] = useState<LevelUpEventState[]>([]);
  const [battleBeginsEvents, setBattleBeginsEvents] = useState<BattleBeginsEventState[]>([]);
  const [battleWonEvents, setBattleWonEvents] = useState<BattleWonEventState[]>([]);
  
  useScaffoldEventSubscriber({
    contractName: "Game_Contract",
    eventName: "LevelUp",
    listener: (account, level) => {
      setLevelUpEvents(prevState => [...prevState, { account, level }]);
    },
    once: true,
  });
  
  useScaffoldEventSubscriber({
    contractName: "Game_Contract",
    eventName: "BattleBegins",
    listener: (starter, id, timestamp) => {
      setBattleBeginsEvents(prevState => [...prevState, { starter, id, timestamp }]);
    },
  });
  
  useScaffoldEventSubscriber({
    contractName: "Game_Contract",
    eventName: "BattleWon",
    listener: (attacker, victim, level, timestamp) => {
      setBattleWonEvents(prevState => [...prevState, { attacker, victim, level, timestamp }]);
    },
    once: true,
  });
  

  useEffect(() => {
    localStorage.setItem("levelUpEvents", JSON.stringify(levelUpEvents));
  }, [levelUpEvents]);
  
  useEffect(() => {
    localStorage.setItem("battleBeginsEvents", JSON.stringify(battleBeginsEvents));
  }, [battleBeginsEvents]);
  
  useEffect(() => {
    localStorage.setItem("battleWonEvents", JSON.stringify(battleWonEvents));
  }, [battleWonEvents]);

  const events = [
    {
      key: "levelUpEvent",
      event: levelUpEvents,
      render: () => (
        <div className="flex flex-col py-2 text-white">
          {levelUpEvents.map((eventObj, index) => (
            <div key={`levelUpEvent-${index}`} className="flex border-[1px] border-gray-500 rounded-md gap-0">
              <div className="border-r-[0.5px] border-gray-500">
                <Image src={Pokemon} width={64} height={64} alt="Image" />
              </div>
              <div className="flex flex-col gap-3 items-center px-10">
                <Address address={eventObj.account} />
                <div className="flex items-center gap-0">
                  <p className="m-0 text-white text-md font-medium mr-2 pl-2">
                    Leveled up to level
                  </p>
                  <p className="m-0 text-md pr-2">{eventObj.level?.toString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "battleBeginsEvent",
      event: battleBeginsEvents,
      render: () => (
        <div className="flex flex-col py-2 text-white">
          {battleBeginsEvents.map((eventObj, index) => (
            <div key={`battleBeginsEvent-${index}`} className="flex border-[1px] border-gray-500 rounded-md gap-0">
              <div className="border-r-[0.5px] border-gray-500">
                <Image src={Pokemon} width={64} height={64} alt="Image" />
              </div>
              <div className="flex flex-col gap-3 text-white">
                <Address address={eventObj.starter} />
                <div className="flex items-center gap-0">
                  <p className="m-0 text-white text-xs font-medium mr-2 pl-2">
                    Started a new game
                  </p>
                  <p className="m-0 text-md pr-2">{eventObj.id?.toString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "battleWonEvent",
      event: battleWonEvents,
      render: () => (
        <div className="flex flex-col py-2 text-white">
          {battleWonEvents.map((eventObj, index) => (
            <div key={`battleWonEvent-${index}`} className="flex border-[1px] border-gray-500 rounded-md gap-0">
              <div className="border-r-[0.5px] border-gray-500">
                <Image src={Pokemon} width={64} height={64} alt="Image" />
              </div>
              <div className="flex">
                <Address address={eventObj.attacker} />
                <div className="flex items-center gap-0">
                  <p className="m-0 text-white text-md font-medium mr-2 pl-2">Destroyed</p>
                  <Address address={eventObj.victim} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];
  
  return (
    <div className="flex items-center flex-col py-2 text-white">
      {events.map((eventObj) => {
        const { key, event, render } = eventObj;
        if (event) {
          return (
            <div key={key}>
              {render()}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
  
  

//   return (
//     <div className="flex items-center flex-col py-2 text-white">
//       {levelUpEvent && (
//         <div className="flex border-[1px] border-gray-500 rounded-md gap-0">
//           <div className="border-r-[0.5px] border-gray-500">
//             <Image src={Pokemon} width={64} height={64} alt="Image" />
//           </div>
//           <div className="flex flex-col gap-3 items-center px-10">
//             <Address 
//             address={levelUpEvent.account}
//             // className="m-1 text-[#6B7280] text-xs pl-2" 
//             />
//             <div className="flex items-center gap-0">
//               <p className="m-0 text-white text-md font-medium mr-2 pl-2">
//                 Leveled up to level
//               </p>
//               <p className="m-0 text-md pr-2">
//                 {levelUpEvent.level?.toString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//       {battleBeginsEvent && (
//         <div className="flex border-[1px] border-gray-500 rounded-md gap-0">
//           <div className="border-r-[0.5px] border-gray-500">
//             <Image src={Pokemon} width={64} height={64} alt="Image" />
//           </div>
//           <div className="flex flex-col gap-3 text-white">
//             <Address 
//             address={battleBeginsEvent.starter}
//             />
//             <div className="flex items-center gap-0">
//               <p
//                 className="m-0 text-white text-xs font-medium mr-2 pl-2"
//               >
//                 Started a new game 
//               </p>
//               <p className="m-0 text-md pr-2">
//                 {battleBeginsEvent.id?.toString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//       {battleWonEvent && (
//         <div className="flex border-[1px] border-gray-500 rounded-md gap-0 text-white">
//           <div className="border-r-[0.5px] border-gray-500">
//             <Image src={Pokemon} width={64} height={64} alt="Image" />
//           </div>
//           <div className="flex">
//             <Address 
//             address={battleWonEvent.attacker}
//             // className="m-1 text-[#6B7280] text-xs pl-2" 
//             />
            
//             <div className="flex items-center gap-0">
//               <p className="m-0 text-white text-md font-medium mr-2 pl-2">
//                 Destroyed
//               </p>
//               <Address
//               address={battleWonEvent.victim}
//               />
//               {/* <p className="m-0 text-[#6B7280] text-xs pr-2">
//                 {battleWonEvent.level?.toString()}
//               </p>
//               <p className="m-0 text-[#6B7280] text-xs pr-2">
//                 {battleWonEvent.timestamp?.toString()}
//               </p> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
};

export default Events