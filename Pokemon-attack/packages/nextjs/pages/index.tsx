import Head from "next/head";
import type { NextPage } from "next";
import Navbar from "~~/components/Navbar";
import Hero from "~~/components/Hero";
import Footer from "~~/components/scaffold-eth/Footer";

const Home: NextPage = () => {
  return (
    <>
    <Head>
        <title>Pokemon-Wars</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Footer />
    </main>
    </>
  );
};

export default Home;
