import Link from "next/link";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import logo from "../public/logo.svg";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";

const Navbar = () => {
  // --------- States here -------------
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <nav className="max-w-full bg-transparent flex justify-between items-center px-6 pt-3 lg:flex lg:justify-around lg:px-0 font-plus relative lg:items-center text-white">
      {!expand ? (
        <a
          href="#"
          className="self-center ml-2 lg:hidden"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <BiMenu className="text-5xl" />
        </a>
      ) : (
        <a
          href="#"
          className="self-center text-center lg:hidden fixed left-[80%] z-50 rounded-full ml-3 bg-gray-900 px-2 py-2"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <MdClose className="text-4xl text-white" />
        </a>
      )}
      <div className="flex -order-1">
        <div className="flex items-start justify-start space-x-2 w-auto cursor-pointer">
          <Link
            href="/"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <Image src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <ul className="hidden lg:flex justify-around items-center basis-2/5 text-md">
        <Link href="/">
          <div className="cursor-pointer relative group py-0.5 px-0.5 ">
            <button
              className="relative group-hover:border-t-2 border-[#fff] py-1 transition-all"
            >
              Home
            </button>
          </div>
        </Link>
        <Link href="/">
          <div className="cursor-pointer relative group py-0.5 px-0.5">
            <button
              className="relative group-hover:border-t-2 border-[#fff] py-1 transition-all"
            >
              Leaderboards
            </button>
          </div>
        </Link>
        <Link href="/Deployer">
          <div className="cursor-pointer relative group py-0.5 px-0.5 ">
            <button
              className="relative group-hover:border-t-2 border-[#fff] py-1 transition-all"
            >
              Players
            </button>
          </div>
        </Link>
      </ul>
      <div className="hidden lg:flex items-center">
        <RainbowKitCustomConnectButton />
      </div>
      {/* --------------- Mobile and Tablets --------------- */}
      {/* ------------- Transition for Mobile Menu -------------- */}
      <Transition
        show={expand}
        enter="transition ease-out duration-1000 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-1000 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="lg:hidden w-screen h-screen fixed overflow-y left-0 top-0 z-10"
      >
        <div
          className="lg:hidden flex flex-col items-center h-full px-4 w-full bg-[#121212] py-10 md:px-8"
          id="mobile-menu"
        >
          <div className="flex justify-center space-x-2 items-center w-auto mb-4">
            <Link
              href="/"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <Image src={logo} width={259} height={180} alt="logo" />
            </Link>
          </div>
          <ul className=" flex flex-col justify-evenly items-center basis-2/6 items-start">
            <Link href="/Explorer">
              <button
                className="cursor-pointer transition-all text-3xl mb-4"
              >
                Leaderboard
              </button>
            </Link>
            <Link href="/Deployer">
              <button
                className="cursor-pointer transition-all text-3xl mb-4"
              >
                Players
              </button>
            </Link>
          </ul>
          <div className="flex items-center ">
            <RainbowKitCustomConnectButton />
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;