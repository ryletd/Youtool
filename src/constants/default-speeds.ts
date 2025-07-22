import type { Storage } from "@/types/storage";

export const DEFAULT_SPEEDS = [1, 1.5, 2, 2.5, 3, 5];
export const DEFAULT_STORAGE: Storage = {
  attach: { topLeft: true, bottomLeft: false },
  speeds: DEFAULT_SPEEDS,
  loopButton: true,
  position: { x: 0, y: 0 },
};
