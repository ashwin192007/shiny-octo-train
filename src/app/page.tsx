"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import HuracanScrollCanvas from "@/components/HuracanScrollCanvas";
import HuracanExperience from "@/components/HuracanExperience";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-lambo-black min-h-screen">
      <Navbar />

      {/* SCROLL SEQUENCE (Locked for 600vh) */}
      <section ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HuracanScrollCanvas scrollYProgress={scrollYProgress} />
          <HuracanExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* REST OF SITE */}
      <div className="relative z-20 bg-lambo-black">
        {/* Specs Grid Placeholder */}
        <section className="min-h-screen flex items-center justify-center border-t border-white/10">
          <div className="text-center">
            <h2 className="text-4xl font-orbitron font-bold mb-8 text-white">
              TECHNICAL SPECIFICATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
              {/* Add some dummy specs */}
              <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-lambo-yellow font-rajdhani text-xl mb-2">DISPLACEMENT</h3>
                <p className="text-white font-orbitron text-2xl">5,204 cm³</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-lambo-yellow font-rajdhani text-xl mb-2">MAX POWER</h3>
                <p className="text-white font-orbitron text-2xl">640 CV @ 8,000 rpm</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-lambo-yellow font-rajdhani text-xl mb-2">TOP SPEED</h3>
                <p className="text-white font-orbitron text-2xl">325 km/h</p>
              </div>
              <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-lambo-yellow font-rajdhani text-xl mb-2">ACCELERATION</h3>
                <p className="text-white font-orbitron text-2xl">0-100 km/h in 2.9 s</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 text-center">
          <p className="text-gray-500 font-rajdhani uppercase tracking-widest">
            © {new Date().getFullYear()} Automobili Lamborghini S.p.A.
          </p>
        </footer>
      </div>
    </main>
  );
}
