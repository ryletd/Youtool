import { useState, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import classNames from "classnames";

import { DEFAULT_SPEEDS } from "@/constants/default-speeds";
import { getItem } from "@/chrome/storage/get-item";

import "./block.sass";

type Position = {
  x: number;
  y: number;
};

export const Block = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [speeds, setSpeeds] = useState<string[]>(DEFAULT_SPEEDS);

  const onDrag = (event: DraggableEvent, { x, y }: DraggableData) => {
    setPosition({ x, y });
  };

  useEffect(() => {
    const loadSavedSpeeds = async () => {
      const storage = await getItem<{ speeds: string[] }>("speeds");

      if (storage?.speeds?.length) {
        setSpeeds(storage.speeds);
      }
    };

    loadSavedSpeeds();
  }, []);

  return (
    <Draggable
      defaultPosition={position}
      position={position}
      onDrag={onDrag}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
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
