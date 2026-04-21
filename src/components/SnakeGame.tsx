/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Point, Direction, GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const generateFood = useCallback(() => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Border collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      // Self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 100);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center justify-between w-full max-w-md px-4">
        <div className="text-cyan font-mono text-sm">
          [ ACCESS_CODE: 0x42 ]
        </div>
        <div className="text-magenta font-mono text-sm glitch" data-text={`SCORE: ${score.toString().padStart(6, '0')}`}>
          SCORE: {score.toString().padStart(6, '0')}
        </div>
      </div>

      <div 
        className="relative border-4 border-cyan/50 bg-black overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.2)]"
        style={{ width: '400px', height: '400px' }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10 pointer-events-none">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan" />
          ))}
        </div>

        {/* Snake components */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${i}-${segment.x}-${segment.y}`}
            className="absolute bg-cyan shadow-[0_0_8px_#00ffff]"
            style={{
              width: '20px',
              height: '20px',
              left: segment.x * 20,
              top: segment.y * 20,
              zIndex: 10
            }}
            initial={false}
            animate={{ scale: 1 }}
          />
        ))}

        {/* Food */}
        <motion.div
          className="absolute bg-magenta shadow-[0_0_8px_#ff00ff]"
          style={{
            width: '20px',
            height: '20px',
            left: food.x * 20,
            top: food.y * 20,
            borderRadius: '50%'
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />

        <AnimatePresence>
          {(gameOver || isPaused) && (
            <motion.div 
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {gameOver ? (
                <>
                  <h2 className="text-magenta text-4xl font-mono font-bold mb-2 glitch" data-text="GAME_OVER">GAME_OVER</h2>
                  <p className="text-cyan font-mono text-xs mb-8">SYSTEM CRITICAL: CONNECTION LOST</p>
                  <button 
                    onClick={resetGame}
                    className="border-2 border-magenta px-6 py-2 text-magenta hover:bg-magenta hover:text-black transition-all font-mono text-sm tracking-widest uppercase"
                  >
                    REBOOT_CORE
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-cyan text-4xl font-mono font-bold mb-2 glitch" data-text="PAUSED">PAUSED</h2>
                  <p className="text-magenta/70 font-mono text-xs mb-8">WAITING FOR INPUT...</p>
                  <button 
                    onClick={() => setIsPaused(false)}
                    className="border-2 border-cyan px-6 py-2 text-cyan hover:bg-cyan hover:text-black transition-all font-mono text-sm tracking-widest uppercase"
                  >
                    RESUME_SESSION
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-[10px] text-white/30 font-mono w-full max-w-md">
        $ [CMD] USE ARROW_KEYS TO MANIPULATE DATA_STREAM
      </div>
    </div>
  );
}
