import { clamp } from 'util/clamp';

export const randomBoolean = (ratio: number = 0.5) =>
  Math.random() < clamp(ratio);
