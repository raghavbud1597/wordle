# Wordle Game

This is a React-based Wordle game where players can guess a 5-letter word within six tries. The game provides feedback on the guessed letters, indicating their presence and position in the target word.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)

## Features

- **Word Guessing**: Guess a 5-letter word within 6 attempts.
- **Feedback System**: Colored tiles indicate the status of each guessed letter:
  - **Green tile**: Letter is in the word and in the correct position.
  - **Yellow tile**: Letter is in the word but in the wrong position.
  - **Gray tile**: Letter is not in the word.
- **Game Statistics**: View detailed statistics on your game performance, including win rate and attempts.
- **Light and Dark Theme**: Toggle between light and dark themes for better accessibility and user preference.
- **Keyboard Representation**: Visual feedback on a virtual keyboard to represent tile colors for each guessed letter.
- **How to Play Modal**: Access instructions on how to play the game through an interactive modal.
- **Accessibility**: Designed to be accessible to individuals with disabilities, ensuring inclusive gameplay for everyone.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/raghavbud1597/wordle.git
   cd wordle-game
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Enter a valid 5-letter word into the input field and press "Enter" to submit your guess.
- After each guess, observe the color changes of the tiles to determine how close your guess was to the actual word.
- Access the game statistics to track your performance and see how many games you've won.
- Toggle between light and dark themes using the theme toggle button in the navbar.
- Use the virtual keyboard to visualize which letters have been guessed and their corresponding tile colors.

## File Structure

```plaintext
app
├── api
├── ValidateWord.test.tsx
├── validateWord.ts
├── assets
│   ├── error.svg
│   └── wordle.svg
├── components
│   ├── __tests__
│   │   ├── FooterComponent.test.tsx
│   │   ├── HowToPlayModalComponent.test.tsx
│   │   ├── KeyboardComponent.test.tsx
│   │   ├── ModalComponent.test.tsx
│   │   ├── StatsModalComponent.test.tsx
│   │   ├── WordleBoardComponent.test.tsx
│   │   ├── WordleCellComponent.test.tsx
│   │   ├── WordleGameComponent.test.tsx
│   │   └── WordleRowComponent.test.tsx
│   ├── Footer.tsx
│   ├── HowToPlayModal.tsx
│   ├── Keyboard.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── StatsModal.tsx
│   ├── ToastProvider.tsx
│   ├── WordleBoard.tsx
│   ├── WordleCell.tsx
│   ├── WordleGame.tsx
│   └── WordleRow.tsx
├── constants
│   └── GameInfo.ts
├── error
│   ├── __snapshots__
│   │   └── ErrorPage.test.tsx.snap
│   ├── ErrorPage.test.tsx
│   └── page.tsx
├── game
│   ├── Game.test.tsx
│   └── page.tsx
├── helpers
│   ├── __tests__
│   │   ├── GameHelpers.test.tsx
│   │   └── gameStatsHelpers.test.tsx
│   ├── gameHelpers.ts
│   └── gameStatsHelpers.ts
├── hooks
│   ├── useGameStats.ts
│   ├── useTheme.ts
│   └── useWordleGame.ts
├── HomePage.test.tsx
├── favicon.svg
├── globals.css
├── layout.tsx
├── page.tsx
├── public
│   └── favicon.svg
├── .eslintrc.json
├── .gitignore
├── README.md
├── next.config.ts
├── package-lock.json
├── package.json
└── postcss.config.mjs
```