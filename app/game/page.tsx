import WordleGame from "../components/WordleGame";
import Navbar from "../components/Navbar";
import ToastProvider from "../components/ToastProvider";

// This is the server component rendering the game page
export default function GamePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-full flex items-center justify-center p-1 md:p-8 lg:p-16">
        <WordleGame />
      </div>
      <ToastProvider />
    </div>
  );
}
