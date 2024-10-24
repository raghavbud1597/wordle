import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";
import WordleLogo from "./assets/wordle.svg";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-30 h-30 rounded-full mb-6">
        <Image
          src={WordleLogo}
          alt="Wordle Logo"
          width={100}
          height={100}
        />
      </div>

      <h1 className="text-6xl font-bold mb-4 font-secondary">Wordle</h1>

      <p className="text-2xl mb-6 text-center font-secondary">
        Get 6 chances to guess <br /> a 5 letter word.
      </p>

      <div className="flex flex-col md:flex-row">
        <Link
          href="/game"
          className="flex items-center bg-black text-white border-2 border-white rounded-full hover:text-black hover:bg-white hover:border-black px-12 py-2 my-4 mx-4 md:my-0 flex-1 text-2xl"
          aria-label="Play the Wordle game"
        >
          <IoGameControllerOutline className="mr-2" /> Play
        </Link>

        <Link
          href="https://github.com/raghavbud1597/wordle"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white text-black border-2 border-black rounded-full hover:bg-black hover:text-white hover:border-white px-12 py-2 mx-4 flex-1 text-2xl"
          aria-label="View the Wordle code on GitHub"
        >
          <FaGithub className="mr-2" /> Code
        </Link>
      </div>

      <Footer />
    </div>
  );
}
