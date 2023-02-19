import { useEffect, useRef } from "react";

export const useVideoSpy = (speed: number) => {
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const onMutate = (mutations: Pick<MutationRecord, "target">[]) => {
      mutations.forEach(({ target }) => {
        if (!(target instanceof HTMLElement)) return;

        const videos = target.querySelectorAll("video");

        if (!videos.length) return;

        videos.forEach((video) => {
          video.playbackRate = speed;
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
  }, [speed]);
};
