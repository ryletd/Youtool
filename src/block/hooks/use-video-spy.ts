import { useState, useEffect, useRef } from "react";

type Mutation = {
  target: Node;
  addedNodes?: NodeList;
  removedNodes?: NodeList;
};

type ReturnType = [activeSpeed: number, setActiveSpeed: (speed: number) => void];

export const useVideoSpy = (): ReturnType => {
  const [activeSpeed, setActiveSpeed] = useState<number>(1);
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const onPlayBackRateChange = ({ target }: Event) => {
      if (!(target instanceof HTMLVideoElement)) return;
      // For fixing bug. When user change active tab or resize browser window, Youtube set playbackRate = 0
      if (target.playbackRate === 1) return;

      setActiveSpeed(target.playbackRate);
    };

    const onMutate = (mutations: Mutation[]) => {
      mutations.forEach(({ target, addedNodes, removedNodes }) => {
        if (!(target instanceof HTMLElement)) return;

        const videos = target.querySelectorAll("video");

        if (!videos.length) return;

        videos.forEach((video) => {
          video.playbackRate = activeSpeed;

          if (addedNodes?.length) {
            video.addEventListener("ratechange", onPlayBackRateChange);
          }

          if (removedNodes?.length) {
            video.removeEventListener("ratechange", onPlayBackRateChange);
          }
        });
      });
    };

    observer.current = new MutationObserver(onMutate);
    observer.current.observe(document, { childList: true, subtree: true });
    // Imitate mutation when user change video speed
    onMutate([{ target: document.body }]);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [activeSpeed]);

  return [activeSpeed, setActiveSpeed];
};
