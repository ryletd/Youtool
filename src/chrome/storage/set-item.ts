export const setItem = async (name: string, value: unknown) => chrome.storage.sync.set({ [name]: value });
