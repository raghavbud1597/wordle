export const validateWord = async (guess: string) => {
    const response = await fetch("https://wordle-apis.vercel.app/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to validate the word");
    }
  
    return response.json(); // { isvalidword: boolean, score: number[] }
  };
  