export const MAX_ATTEMPTS = 6;
export const HARD_MAX_ATTEMPT = 4;
export const WORD_LENGTH = 5;

export const DEFAULT_FEEDBACK = Object.fromEntries(
  Array.from("abcdefghijklmnopqrstuvwxyz").map((char) => [char, -1])
);
