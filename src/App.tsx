/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background FX */}
      <div className="scanline" />
      <div className="noise" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 p-8 z-0 opacity-20">
        <div className="text-[8rem] font-mono font-bold leading-none select-none">
          01
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-8 z-0 opacity-20">
        <div className="text-[8rem] font-mono font-bold leading-none select-none">
          FX
        </div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 border-b border-cyan/10">
        <div className="flex flex-col">
          <h1 className="text-cyan font-mono text-2xl font-bold tracking-tighter glitch" data-text="NEON_GLITCH: OS_v4.2">
            NEON_GLITCH: OS_v4.2
          </h1>
          <span className="text-white/30 text-[10px] font-mono mt-1">
            STATUS: [ SYSTEM_NOMINAL ] | USER: [ ROOT ]
          </span>
        </div>
        <div className="flex gap-4">
           {['SYS', 'LOG', 'NET', 'MAP'].map(label => (
             <button key={label} className="px-3 py-1 border border-white/20 text-white/50 text-xs font-mono hover:border-magenta hover:text-magenta transition-all cursor-crosshair">
               {label}
             </button>
           ))}
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex flex-col items-center justify-center p-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative"
        >
          {/* Decorative Framing */}
          <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-magenta opacity-50" />
          <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-cyan opacity-50" />
          
          <SnakeGame />
        </motion.div>
      </main>

      {/* Footer Info (Sidebar-like details) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-8 pointer-events-none opacity-40 hidden lg:flex">
         <div className="flex flex-col">
           <span className="text-magenta text-[10px] font-mono font-bold">X_POS</span>
           <span className="text-white text-sm font-mono tracking-widest">1024.232</span>
         </div>
         <div className="flex flex-col">
           <span className="text-magenta text-[10px] font-mono font-bold">Y_POS</span>
           <span className="text-white text-sm font-mono tracking-widest">0768.910</span>
         </div>
         <div className="flex flex-col">
           <span className="text-magenta text-[10px] font-mono font-bold">Z_INF</span>
           <span className="text-white text-sm font-mono tracking-widest">NULL</span>
         </div>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-8 items-end pointer-events-none opacity-40 hidden lg:flex text-right">
         <div className="flex flex-col">
           <span className="text-cyan text-[10px] font-mono font-bold">CPU_LOAD</span>
           <span className="text-white text-sm font-mono tracking-widest">12%</span>
         </div>
         <div className="flex flex-col">
           <span className="text-cyan text-[10px] font-mono font-bold">UPLINK</span>
           <span className="text-white text-sm font-mono tracking-widest">SYNCHRONIZED</span>
         </div>
         <div className="flex flex-col">
           <span className="text-cyan text-[10px] font-mono font-bold">VERSION</span>
           <span className="text-white text-sm font-mono tracking-widest">BETA_08</span>
         </div>
      </div>

      {/* Music Player */}
      <MusicPlayer />
      
      {/* Overlay Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-40" />
    </div>
  );
}
