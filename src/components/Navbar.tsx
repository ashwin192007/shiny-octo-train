import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 backdrop-blur-md bg-lambo-black/50 border-b border-white/10">
            <div className="flex items-center gap-2">
                <span className="font-orbitron font-bold text-xl tracking-widest text-white">
                    LAMBORGHINI
                </span>
            </div>
            <Link
                href="#inquire"
                className="px-6 py-2 font-rajdhani font-semibold text-black bg-white hover:bg-lambo-yellow transition-colors duration-300 skew-x-[-10deg] uppercase tracking-wider"
            >
                <span className="block skew-x-[10deg]">Inquire</span>
            </Link>
        </nav>
    );
}
