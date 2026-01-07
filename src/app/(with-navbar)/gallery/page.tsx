"use client"; // MUST be a client component

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import justifiedLayout from "justified-layout";
import Snowfall from "react-snowfall";
import { useArtwork } from "@/hooks/use-artwork";

export default function GalleryPage() {
  const { data: artworks, isLoading, isError } = useArtwork();

  const ref = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [imagesLoading, setImagesLoading] = useState(false);

  // 3️⃣ Run justified-layout once images are loaded
  useEffect(() => {
    if (!ref.current || !artworks || artworks.length === 0) return;

    const geometry = justifiedLayout(
      artworks.map(img => img.width / img.height), // aspect ratios
      {
        containerWidth: ref.current.clientWidth, // container width
        targetRowHeight: 240, // row height in pixels
        boxSpacing: 8, // gap between images
      }
    );

    setBoxes(geometry.boxes);
    setContainerHeight(geometry.containerHeight);
  }, [artworks]);
  
  if (isLoading) {
    return <div className="p-8">Loading artwork...</div>;
  }

  if (!artworks || artworks.length === 0) {
    return <div className="p-8">No IllustrAtiOn found</div>;
  }


  if (isError) {
    return <div className="p-8 text-red-500">Failed to load artwork</div>;
  }

  return (
    
    <main ref={ref} className="relative w-full min-h-screen p-4 mb-4" style={{height: containerHeight}}>
      <Snowfall />
      {boxes.map((box, i) => {
        const image = artworks[i];
        
        if (!image) return null;
        
        return (
          <div
            key={image.id} // Use unique ID
            style={{
              position: "absolute",
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
            }}
          >
            <Image
              src={image.imageUrl}
              alt={image.title || "Artwork"}
              fill
              className="object-cover"
              sizes={`${box.width}px`}
            />
          </div>
        );
      })}
    </main>
  );
}
