"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * next/image that swaps to a local placeholder if the photo fails to load
 * (e.g. a remote stock photo is removed), so visitors never see a broken image.
 */
export function SmartImage({ fallback = "/images/neighborhood-default.svg", src, alt, ...props }: ImageProps & { fallback?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catch errors that happened before React hydrated.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <Image
      {...props}
      alt={alt}
      ref={ref}
      src={failed ? fallback : src}
      unoptimized={failed || props.unoptimized}
      onError={() => setFailed(true)}
    />
  );
}
