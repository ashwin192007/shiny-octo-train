"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { carData } from "@/data/carData";

interface HuracanExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function HuracanExperience({
    scrollYProgress,
}: HuracanExperienceProps) {
    // Phase 1: Hero (0% - 33%)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

    // Phase 2: Design (33% - 66%)
    const designOpacity = useTransform(
        scrollYProgress,
        [0.25, 0.35, 0.55, 0.65],
        [0, 1, 1, 0]
    );
    const designY = useTransform(
        scrollYProgress,
        [0.25, 0.35, 0.55, 0.65],
        [50, 0, 0, -50]
    );

    // Phase 3: Engine (66% - 100%)
    const engineOpacity = useTransform(
        scrollYProgress,
        [0.65, 0.75, 0.95, 1],
        [0, 1, 1, 0]
    );
    const engineY = useTransform(
        scrollYProgress,
        [0.65, 0.75, 0.95, 1],
        [50, 0, 0, -50]
    );

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center p-8">
            {/* Hero Section */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY }}
                className="text-center absolute"
            >
                <h1 className="text-6xl md:text-8xl font-orbitron font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {carData.hero.title}
                </h1>
                <p className="text-xl md:text-2xl font-rajdhani tracking-[0.2em] text-lambo-yellow mb-8">
                    {carData.hero.subtitle}
                </p>
                <div className="text-white/80 font-rajdhani text-lg">
                    {carData.hero.price}
                </div>
            </motion.div>

            {/* Design Section */}
            <motion.div
                style={{ opacity: designOpacity, y: designY }}
                className="absolute bottom-20 left-10 md:left-20 max-w-lg"
            >
                <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-white border-l-4 border-lambo-orange pl-6">
                    {carData.design.title}
                </h2>
                <p className="text-lg md:text-xl font-rajdhani text-gray-300 leading-relaxed pl-6">
                    {carData.design.description}
                </p>
            </motion.div>

            {/* Engine Section */}
            <motion.div
                style={{ opacity: engineOpacity, y: engineY }}
                className="absolute top-1/2 -translate-y-1/2 right-10 md:right-20 text-right"
            >
                <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-8 text-lambo-yellow">
                    {carData.engine.title}
                </h2>
                <div className="space-y-6">
                    {carData.engine.specs.map((spec, index) => (
                        <div key={index} className="flex justify-end items-center gap-4">
                            <span className="text-gray-400 font-rajdhani tracking-wider text-sm">
                                {spec.label}
                            </span>
                            <span className="text-2xl md:text-4xl font-orbitron font-bold text-white">
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
