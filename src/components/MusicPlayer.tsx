/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { TRACKS, Track } from '../constants';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Playback error:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black/80 backdrop-blur-md border-t border-magenta/30 p-6 fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <div className="w-16 h-16 bg-magenta/20 border border-magenta flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-transparent opacity-50 scanlines" />
            <motion.div 
               animate={{ rotate: isPlaying ? 360 : 0 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="text-magenta"
            >
              <Volume2 size={24} />
            </motion.div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-magenta font-mono text-lg glitch" data-text={currentTrack.title}>
              {currentTrack.title}
            </h3>
            <p className="text-cyan font-mono text-xs opacity-70">
              BY: {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
          <div className="flex items-center gap-8">
            <button onClick={prevTrack} className="text-cyan hover:text-white transition-colors cursor-pointer">
              <SkipBack size={24} />
            </button>
            <button 
              onClick={togglePlay} 
              className="w-12 h-12 bg-cyan/10 border-2 border-cyan rounded-full flex items-center justify-center text-cyan hover:bg-cyan hover:text-black transition-all cursor-pointer box-shadow-[0_0_15px_rgba(0,255,255,0.4)]"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-left-0.5" />}
            </button>
            <button onClick={nextTrack} className="text-cyan hover:text-white transition-colors cursor-pointer">
              <SkipForward size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-3">
            <span className="text-magenta font-mono text-[10px] w-8">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-1 bg-magenta/20 relative cursor-pointer group overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-magenta shadow-[0_0_8px_#ff00ff]"
                 style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
               />
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
            </div>
            <span className="text-magenta font-mono text-[10px] w-8">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Spectrogram Mock */}
        <div className="hidden md:flex items-end gap-1 h-12 w-1/3 justify-end px-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-cyan/40"
              animate={{ 
                height: isPlaying ? [10, 20 + Math.random() * 30, 10] : 4 
              }}
              transition={{ 
                duration: 0.5 + Math.random() * 0.5, 
                repeat: Infinity 
              }}
            />
          ))}
        </div>

      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
    </div>
  );
}
