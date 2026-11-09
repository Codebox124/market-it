"use client";

import { useEffect, useRef } from "react";

/**
 * The homepage main reel: self-hosted, muted, looping, inline.
 * Autoplay is attempted on mount; on browsers that defer autoplay
 * until the visitor interacts with the page (e.g. iOS Low Power
 * Mode), playback starts on the first touch or click instead of
 * leaving a static poster. Nothing here can override a device's
 * own power-saving rules — this just takes the earliest start
 * each browser allows.
 */
export default function ReelVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => {
      if (v.paused) v.play().catch(() => {});
    };
    tryPlay();
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("touchstart", tryPlay, { once: true });
    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="block w-full aspect-video object-cover"
      poster="/video/main-reel-poster-v2.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Make It & Market showreel"
    >
      <source src="/video/main-reel-v2.webm" type="video/webm" />
      <source src="/video/main-reel-v2.mp4" type="video/mp4" />
    </video>
  );
}
