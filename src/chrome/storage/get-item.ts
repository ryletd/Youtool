export const getItem = async <T>(names: string | string[]): Promise<T | null> => {
  try {
    const value = await chrome.storage.sync.get(names);

    return value as T;
  } catch {
    return null;
  }
};
