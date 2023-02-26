import { MouseEvent, useRef } from "react";

const CLASSES = {
  SETTING_OPTIONS: ".ytp-settings-menu .ytp-panel-menu .ytp-menuitem[role='menuitem']",
  BEST_QUALITY_BUTTON: ".ytp-quality-menu .ytp-panel-menu .ytp-menuitem",
};

export const useQuality = () => {
  const observer = useRef<MutationObserver | null>(null);

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
    // Imitate mutation when user change video speed
    onMutate([{ target: document.body }], observer.current);
  };

  return setBestQuality;
};
