import { useState, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData, ControlPosition } from "react-draggable";
import classNames from "classnames";

import { DEFAULT_SPEEDS } from "@/constants/default-speeds";

import { getItem } from "@/chrome/storage/get-item";
import { setItem } from "@/chrome/storage/set-item";

import "./block.sass";

export const Block = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<ControlPosition>({ x: 0, y: 0 });
  const [speeds, setSpeeds] = useState<string[]>(DEFAULT_SPEEDS);

  const onDrag = (event: DraggableEvent, { x, y }: DraggableData) => {
    setPosition({ x, y });
  };

  const onDragEnd = (event: DraggableEvent, { x, y }: DraggableData) => {
    setIsDragging(false);
    setItem("position", position);
  };

  useEffect(() => {
    const loadSavedSettings = async () => {
      const storage = await getItem<{ speeds: string[]; position: ControlPosition }>(["speeds", "position"]);

      if (storage?.speeds?.length) {
        setSpeeds(storage.speeds);
      }

      if (storage?.position) {
        setPosition(storage.position);
      }
    };

    loadSavedSettings();
  }, []);

  return (
    <Draggable
      defaultPosition={position}
      position={position}
      onDrag={onDrag}
      onStart={() => setIsDragging(true)}
      onStop={onDragEnd}
    >
      <div className={classNames("youtool", { "no-transition": isDragging })}>
        {speeds.map((speed) => (
          <button key={speed} className="youtool-button">
            {speed}
          </button>
        ))}
      </div>
    </Draggable>
  );
};
