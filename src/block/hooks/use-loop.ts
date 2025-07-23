import { useEffect, useRef, useState } from "react";

const CLASSES = {
  LOOP_BUTTON: ".ytp-contextmenu .ytp-menuitem",
  PLAYER: ".html5-video-player",
};

export const useLoop = () => {
  const [loop, setLoop] = useState<boolean>(false);
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    observer.current = new MutationObserver(onLoopMutate);
    observer.current.observe(document, { childList: true, subtree: true });
  }, []);

  function onLoopMutate(mutations: Pick<MutationRecord, "target">[]) {
    mutations.forEach(async () => {
      const isEnabled =
        document.querySelector<HTMLButtonElement>(CLASSES.LOOP_BUTTON)?.getAttribute("aria-checked") === "true";

      setLoop(isEnabled);
    });
  }

  const toggleLoop = () => {
    const player = document.querySelector<HTMLDivElement>(CLASSES.PLAYER);

    if (player) {
      player.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true, button: 2 }));

      document.querySelector<HTMLButtonElement>(CLASSES.LOOP_BUTTON)?.click();
    }
  };

  return { loop, toggleLoop };
};
