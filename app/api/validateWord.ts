import { redirect } from 'next/navigation'

const URL = "https://wordle-apis.vercel.app/api/validate";

export const validateWord = async (guess: string) => {
  
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json(); // { isvalidword: boolean, score: number[] }
    return data;
    
  } catch (error) {
    console.error("Error validating the word:", error);
    // Navigate to an error page
    redirect('/error');
    throw new Error("Failed to validate the word. Redirecting to the error page.");
  }
};
