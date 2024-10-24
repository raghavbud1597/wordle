/**
 * ErrorPage.tsx
 *
 * This component displays a user-friendly error message when something goes wrong.
 * It includes an image, an error message, and a button to navigate back to the homepage.
 */

import Image from "next/image";
import Link from "next/link";
import ErrorImg from "../assets/error.svg";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <Image
        src={ErrorImg}
        alt="Error Image"
        width={300}
        height={300}
        className="mb-4"
      />
      <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
      <Link
        href="/"
        className="bg-white text-black border-2 border-black rounded-full hover:bg-black hover:text-white hover:border-white px-12 py-2 mx-4 text-lg"
        aria-label="Back to the homepage"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
