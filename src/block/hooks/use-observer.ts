import { useEffect, useRef, useState } from "react";
import {} from "antd/";

import type { MouseEvent } from "react";

const CLASSES = {
  SETTING_OPTIONS: ".ytp-settings-menu .ytp-panel-menu .ytp-menuitem[role='menuitem']",
  BEST_QUALITY_BUTTON: ".ytp-quality-menu .ytp-panel-menu .ytp-menuitem",
  SETTINGS_BUTTON: ".ytp-settings-button",
  LOOP_BUTTON: ".ytp-contextmenu .ytp-menuitem",
  PLAYER: ".html5-video-player",
};

export const useObserver = () => {
  const [loop, setLoop] = useState<boolean>(false);
  const observer = useRef<MutationObserver | null>(null);
  const loopObserver = useRef<MutationObserver | null>(null);

  useEffect(() => {
    loopObserver.current = new MutationObserver(onLoopMutate);
    loopObserver.current.observe(document, { childList: true, subtree: true });
  }, []);

  const setBestQuality = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const onMutate = (mutations: Pick<MutationRecord, "target">[], observer: MutationObserver) => {
      mutations.forEach(async ({ target }) => {
        if (!(target instanceof HTMLElement)) return;

        const settingsOptions = target.querySelectorAll(CLASSES.SETTING_OPTIONS);

        if (settingsOptions.length) {
          const qualityButton = Array.from(settingsOptions).at(-1);

          if (qualityButton instanceof HTMLElement) {
            qualityButton.click();
          }

          return;
        }

        const bestQuality = document.querySelector(CLASSES.BEST_QUALITY_BUTTON);

        if (bestQuality instanceof HTMLElement) {
          bestQuality.click();

          observer.disconnect();
        }
      });
    };

    // If observer already running stop it (anti-spam)
    observer.current?.disconnect();
    observer.current = new MutationObserver(onMutate);
    observer.current.observe(document, { childList: true, subtree: true });
    setTimeout(observer.current.disconnect, 3000);

    const settingsButton = document.querySelector<HTMLButtonElement>(CLASSES.SETTINGS_BUTTON);

    if (settingsButton) {
      settingsButton.click();
    }

    // Imitate mutation when user change video speed
    onMutate([{ target: document.body }], observer.current);
  };

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
      player.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true, button: 2 } as any));

      setTimeout(() => document.querySelector<HTMLButtonElement>(CLASSES.LOOP_BUTTON)?.click(), 50);
    }
  };

  return { setBestQuality, loop, toggleLoop };
};
