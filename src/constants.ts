/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
}

export type Point = { x: number; y: number };

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'CYBER_DREAM_01',
    artist: 'GEN_AI_v1.0',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 372
  },
  {
    id: '2',
    title: 'STATIC_VOID_02',
    artist: 'KERN_MOD_02',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 425
  },
  {
    id: '3',
    title: 'NEON_PULSE_03',
    artist: 'VOID_WALKER_03',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 310
  }
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 }
];
export const INITIAL_DIRECTION: Direction = 'UP';
export const GAME_SPEED = 150;
