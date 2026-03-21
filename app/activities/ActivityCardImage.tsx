"use client";

import { IMAGE_DEFAULT } from "@/constants/app-config";
import Image from "next/image";

interface ActivityCardImageProps {
  src: string;
  alt: string;
}

export default function ActivityCardImage({
  src,
  alt,
}: ActivityCardImageProps) {
  if (!src) {
    src = IMAGE_DEFAULT.BG_THUNGMON; // Use default image if src is not provided
  }

  return (
    <Image
      fetchPriority="low"
      src={src}
      alt={alt}
      width={640}
      height={360}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}
