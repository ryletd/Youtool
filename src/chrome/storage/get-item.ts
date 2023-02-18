export const getItem = async <T>(name: string): Promise<T | null> => {
  try {
    const value = await chrome.storage.sync.get(name);

    return value as T;
  } catch {
    return null;
  }
};
