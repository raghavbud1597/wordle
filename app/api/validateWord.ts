/**
 * Validates a guessed word by sending a request to the Wordle API.
 * 
 * @param guess - The word guessed by the user.
 * @returns A promise that resolves to the API response containing validation information.
 * @throws An error if the API request fails or returns an error status.
 */

import { redirect } from 'next/navigation';

// API endpoint for word validation
const URL = "https://wordle-apis.vercel.app/api/validate";

// TypeScript interface for the expected API response
interface ValidateResponse {
  is_valid_word: boolean;   
  score: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
}

export const validateWord = async (guess: string): Promise<ValidateResponse> => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
    });

    // If the response is not OK, redirect to the error page
    if (!response.ok) {
      redirect('/error');
      throw new Error(`API Error: ${response.statusText}`);
    }

    // Parse and return the response data
    const data: ValidateResponse = await response.json();
    return data;
    
  } catch (error) {
    console.error("Error validating the word:", error);
    // Navigate to an error page on catch
    redirect('/error');
    throw new Error("Failed to validate the word. Redirecting to the error page.");
  }
};
