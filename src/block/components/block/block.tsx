import { useState } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import classNames from "classnames";

import "./block.sass";

type Position = {
  x: number;
  y: number;
};

export const Block = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const speeds = ["1", "1.5", "2", "2.5", "3", "5"];

  const onDrag = (event: DraggableEvent, { x, y }: DraggableData) => {
    setPosition({ x, y });
  };

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
