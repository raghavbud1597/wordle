import WordleGame from "../components/WordleGame";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// This is the server component rendering the game page
export default function GamePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <WordleGame />
      </div>
      <Footer />
    </div>
  );
}
