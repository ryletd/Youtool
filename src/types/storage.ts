import type { ControlPosition } from "react-draggable";
import type { AttachPosition } from "@/types/attach-position";

export type Storage = {
  speeds?: number[];
  position?: ControlPosition;
  attach?: AttachPosition;
  loopButton?: boolean;
};
