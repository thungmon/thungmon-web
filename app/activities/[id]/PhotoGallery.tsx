"use client";

import { useCallback, useEffect, useState } from "react";

export interface ActivityImage {
  id: string;
  filename: string | null;
  url: string | null;
  caption: string | null;
}

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

export function PhotoGallery({ images }: { images: ActivityImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i !== null ? (i - 1 + images.length) % images.length : null,
      ),
    [images.length],
  );

  const next = useCallback(
    () => setOpenIndex((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length],
  );

  const close = useCallback(() => setOpenIndex(null), []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, prev, next, close]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const current = isOpen ? images[openIndex!] : null;

  return (
    <>
      {/* ─── Thumbnail grid ─── */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            aria-label={`ดูรูป ${img.caption ?? img.filename}`}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-4/3 w-full cursor-pointer overflow-hidden rounded-2xl bg-[#f5f5f7]"
          >
            {/* Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-[#d2d2d7]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path strokeLinecap="round" d="M21 15l-5-5L5 21" />
              </svg>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url || undefined}
              alt={img.caption ?? img.filename ?? ""}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 transition-all duration-300 group-hover:bg-black/45">
              {/* Magnifier icon */}
              <svg
                className="h-7 w-7 translate-y-1 text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <span className="translate-y-1 text-[12px] font-medium text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                ดูรูปเต็ม
              </span>
            </div>

            {/* Caption gradient bar */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent px-3 pt-6 pb-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="truncate text-[11px] text-white/90">
                {img.caption ?? ""}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ─── Lightbox ─── */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/92" />

          {/* Image container */}
          <div
            className="relative z-10 flex max-h-screen max-w-[min(90vw,1200px)] flex-col items-center px-16 py-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.id}
              src={current.url || undefined}
              alt={current.caption ?? current.filename ?? ""}
              className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            {/* Caption */}
            {current.caption && (
              <p className="mt-4 text-center text-sm text-white/55">
                {current.caption}
              </p>
            )}
          </div>

          {/* Top-left: counter */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-white/60 backdrop-blur-sm">
              {openIndex! + 1} / {images.length}
            </span>
          </div>

          {/* Top-right: download + close */}
          <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
            <a
              href={current.url || undefined}
              download={current.filename}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <DownloadIcon />
              ดาวน์โหลด
            </a>
            <button
              type="button"
              aria-label="ปิด"
              onClick={close}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Prev arrow */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="รูปก่อนหน้า"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:cursor-pointer hover:bg-white/20 md:left-8"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next arrow */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="รูปถัดไป"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:cursor-pointer hover:bg-white/20 md:right-8"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Keyboard hint */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-white/25">
            ← → เลื่อนดูรูป · Esc ปิด
          </p>
        </div>
      )}
    </>
  );
}
