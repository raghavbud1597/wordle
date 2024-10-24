/**
 * GamePage.tsx
 *
 * This component serves as the main page for the Wordle game.
 * It renders the game UI, including the navigation bar and the Wordle game component.
 * The `ToastProvider` component is included to manage and display notifications
 */

import WordleGame from "../components/WordleGame";
import Navbar from "../components/Navbar";
import ToastProvider from "../components/ToastProvider";

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
