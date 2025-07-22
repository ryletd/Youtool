import type { Storage } from "@/types/storage";

export const getItem = async (names: keyof Storage | (keyof Storage)[]): Promise<Storage | null> => {
  try {
    const value = await chrome.storage.sync.get(names as Storage);

    return value as Storage;
  } catch {
    return null;
  }
};
