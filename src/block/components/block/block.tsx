import { useState, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData, ControlPosition } from "react-draggable";
import classNames from "classnames";

import { DEFAULT_STORAGE } from "@/constants/default-speeds";
import { useVideoSpy } from "@/block/hooks/use-video-spy";
import { useObserver } from "@/block/hooks/use-observer";

import { getItem } from "@/chrome/storage/get-item";
import { setItem } from "@/chrome/storage/set-item";

import "./block.sass";

import type { AttachPosition } from "@/types/attach-position";
import type { Storage } from "@/types/storage";

export const Block = () => {
  const [storage, setStorage] = useState<Storage>(DEFAULT_STORAGE);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeSpeed, setActiveSpeed] = useVideoSpy();
  const { setBestQuality, loop, toggleLoop } = useObserver();

  const onDrag = (event: DraggableEvent, { x, y }: DraggableData) => {
    setStorage((oldStorage) => ({ ...oldStorage, position: { x, y } }));
  };

  const onDragEnd = () => {
    setIsDragging(false);
    setItem("position", storage.position);
  };

  const isBlockAttached = (Object.keys(storage.attach ?? {}) as (keyof AttachPosition)[])
    .map((key) => (storage.attach ?? {})[key])
    .find((item) => item);

  useEffect(() => {
    const loadSavedSettings = async () => {
      const originalStorage = await getItem(["speeds", "position", "attach", "loopButton"]);

      if (!originalStorage) {
        return;
      }

      if (originalStorage.speeds?.length) {
        setStorage((oldStorage) => ({ ...oldStorage, speeds: originalStorage.speeds }));
      }

      if (originalStorage.position) {
        setStorage((oldStorage) => ({ ...oldStorage, position: originalStorage.position }));
      }

      if (originalStorage.attach) {
        setStorage((oldStorage) => ({ ...oldStorage, attach: originalStorage.attach }));
      }

      if (originalStorage.loopButton) {
        setStorage((oldStorage) => ({ ...oldStorage, loopButton: originalStorage.loopButton }));
      }
    };

    loadSavedSettings();
  }, []);

  return (
    <>
      <div className="active-speed">{activeSpeed}</div>
      <div onContextMenu={setBestQuality}>
        <Draggable
          defaultPosition={storage.position}
          position={isBlockAttached ? undefined : storage.position}
          onDrag={onDrag}
          onStart={() => setIsDragging(true)}
          onStop={onDragEnd}
          disabled={isBlockAttached}
        >
          <div
            className={classNames("youtool", {
              "no-transition": isDragging,
              "attach-top-left": storage.attach?.topLeft,
              "attach-bottom-left": storage.attach?.bottomLeft,
            })}
          >
            {storage.speeds?.map((speed) => (
              <button
                key={speed}
                className={classNames("youtool-button", { active: activeSpeed === speed })}
                onClick={() => setActiveSpeed(speed)}
              >
                {speed}
              </button>
            ))}
            {storage.loopButton && (
              <button className={classNames("youtool-button", { active: loop })} onClick={toggleLoop}>
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z" fill="white"></path>
                </svg>
              </button>
            )}
          </div>
        </Draggable>
      </div>
    </>
  );
};
