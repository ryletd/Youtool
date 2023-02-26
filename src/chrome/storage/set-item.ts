import { Storage } from "@/types/storage";

export const setItem = async (name: keyof Storage, value: unknown) => chrome.storage.sync.set({ [name]: value });
