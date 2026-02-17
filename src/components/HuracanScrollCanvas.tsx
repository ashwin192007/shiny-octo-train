"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

interface HuracanScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames?: number;
    imageFolderPath?: string;
}

export default function HuracanScrollCanvas({
    scrollYProgress,
    totalFrames = 181,
    imageFolderPath = "/images/huracan-sequence",
}: HuracanScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${imageFolderPath}/${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    const renderFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas || !images[index]) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Ensure canvas dimensions match screen and DPI
            const dpr = window.devicePixelRatio || 1;

            // Only resize if dimensions change to avoid clearing canvas unnecessarily
            // But we need to handle resize. 
            // For simplicity, let's just set it every frame or use a resize observer.
            // Or just rely on CSS for size and internal coordinate system for resolution.

            if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                ctx.scale(dpr, dpr);
            } else {
                // If we don't resize, we might need to clear or restore context state if we do transforms
                // But we are scaling once after resize. If we don't resize, scale persists? No, canvas reset on resize.
                // If we don't resize, we need to ensure scale is correct. `ctx.resetTransform()` then `scale`.
                ctx.resetTransform();
                ctx.scale(dpr, dpr);
            }

            const img = images[index];

            // Calculate aspect ratio fit
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                // Window is wider than image -> fit by height (contain)
                drawHeight = canvasHeight;
                drawWidth = drawHeight * imgRatio;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Window is taller than image -> fit by width (contain)
                drawWidth = canvasWidth;
                drawHeight = drawWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        },
        [images]
    );

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) {
            renderFrame(0);
        }
    }, [isLoaded, renderFrame]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
    );
}
