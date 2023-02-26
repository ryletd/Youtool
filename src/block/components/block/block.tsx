import { useState, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData, ControlPosition } from "react-draggable";
import classNames from "classnames";

import { DEFAULT_SPEEDS } from "@/constants/default-speeds";
import { useVideoSpy } from "@/block/hooks/use-video-spy";
import { useQuality } from "@/block/hooks/use-quality";

import { getItem } from "@/chrome/storage/get-item";
import { setItem } from "@/chrome/storage/set-item";

import "./block.sass";

import type { Storage } from "@/types/storage";
import type { AttachPosition } from "@/types/attach-position";

export const Block = () => {
  const [speeds, setSpeeds] = useState<number[]>(DEFAULT_SPEEDS);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<ControlPosition>({ x: 0, y: 0 });
  const [attachPosition, setAttachPosition] = useState<AttachPosition>({});
  const [activeSpeed, setActiveSpeed] = useVideoSpy();
  const setBestQuality = useQuality();

  const onDrag = (event: DraggableEvent, { x, y }: DraggableData) => {
    setPosition({ x, y });
  };

  const onDragEnd = () => {
    setIsDragging(false);
    setItem("position", position);
  };

  const isBlockAttached = (Object.keys(attachPosition) as (keyof AttachPosition)[])
    .map((key) => attachPosition[key])
    .find((item) => item);

  useEffect(() => {
    const loadSavedSettings = async () => {
      const storage = await getItem<Storage>(["speeds", "position", "attach"]);

      if (storage?.speeds?.length) {
        setSpeeds(storage.speeds);
      }

      if (storage?.position) {
        setPosition(storage.position);
      }

      if (storage?.attach) {
        setAttachPosition(storage.attach);
      }
    };

    loadSavedSettings();
  }, []);

  return (
    <>
      <div className="active-speed">{activeSpeed}</div>
      <div onContextMenu={setBestQuality}>
        <Draggable
          defaultPosition={position}
          position={isBlockAttached ? undefined : position}
          onDrag={onDrag}
          onStart={() => setIsDragging(true)}
          onStop={onDragEnd}
          disabled={isBlockAttached}
        >
          <div
            className={classNames("youtool", {
              "no-transition": isDragging,
              "attach-top-left": attachPosition.topLeft,
              "attach-bottom-left": attachPosition.bottomLeft,
            })}
          >
            {speeds.map((speed) => (
              <button
                key={speed}
                className={classNames("youtool-button", { active: activeSpeed === speed })}
                onClick={() => setActiveSpeed(speed)}
              >
                {speed}
              </button>
            ))}
          </div>
        </Draggable>
      </div>
    </>
  );
};
