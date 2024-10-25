import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateWord } from './validateWord';
import { redirect } from 'next/navigation';

const mockResponse = { is_valid_word: true, score: [0, 1, 2, 0, 1] };

describe('validateWord', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.mock('next/navigation', () => ({
      redirect: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should validate the guessed word successfully', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await validateWord('apple');
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith("https://wordle-apis.vercel.app/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: 'apple' }),
    });
  });

  it('should redirect to the error page if the response is not OK', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
      json: async () => mockResponse,
    });

    await validateWord('apple');
    expect(redirect).toHaveBeenCalledWith('/error');
    expect(fetch).toHaveBeenCalled();
  });
});
