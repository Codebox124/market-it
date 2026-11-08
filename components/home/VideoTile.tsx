"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Click-to-play video facade: the page loads only a poster image.
 * The YouTube player (and its scripts) loads solely after a visitor
 * clicks play, so the tile costs the page nothing in load performance.
 */
export default function VideoTile({
  poster,
  alt,
  videoId,
}: {
  poster: string;
  alt: string;
  videoId: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={alt}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play video"
      className="group/video absolute inset-0 block h-full w-full cursor-pointer"
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(min-width: 768px) 58vw, 100vw"
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-gold)] text-[#0B0B0D] shadow-xl transition-transform duration-300 group-hover/video:scale-110">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
