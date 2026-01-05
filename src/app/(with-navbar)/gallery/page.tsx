"use client"; // MUST be a client component

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import justifiedLayout from "justified-layout";
import React from "react";
import Snowfall from "react-snowfall";

interface ImageData {
  src: string;
  w: number;
  h: number;
}

export default function GalleryPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  // 1️⃣ List of image URLs
  const imageUrls = ["/1.png", "/2.png", "/3.png", "/4.png", "/2.png", "/4.png", "/2.png", "/1.png", "/2.png", "/3.png", "/a.jpg", "/c.jpg", "/e.jpg", "/d.jpg", "/b.jpg"];

  // 2️⃣ Load image dimensions dynamically in the browser
  useEffect(() => {
    async function loadImages() {
      const loaded: ImageData[] = await Promise.all(
        imageUrls.map(
          src =>
            new Promise<ImageData>((resolve, reject) => {
              const img = new window.Image();
              img.onload = () =>
                resolve({
                  src,
                  w: img.naturalWidth,
                  h: img.naturalHeight,
                });
              img.onerror = reject;
              img.src = src;
            })
        )
      );

      setImages(loaded);
    }

    loadImages();
  }, []);

  // 3️⃣ Run justified-layout once images are loaded
  useEffect(() => {
    if (!ref.current || images.length === 0) return;

    const geometry = justifiedLayout(
      images.map(img => img.w / img.h), // aspect ratios
      {
        containerWidth: ref.current.clientWidth, // container width
        targetRowHeight: 240, // row height in pixels
        boxSpacing: 8, // gap between images
      }
    );

    setBoxes(geometry.boxes);
    setContainerHeight(geometry.containerHeight);
  }, [images]);


  return (
    
    <main ref={ref} className="relative w-full min-h-screen p-4 mb-4" style={{height: containerHeight}}>
      <Snowfall />
      {boxes.map((box, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
          }}
        >
          <Image
            src={images[i].src}
            alt=""
            fill
            className=""
          />
        </div>
      ))}
    </main>
  );
}
