import { clamp } from 'util/clamp';
import { Ease, easeInOutExpo } from 'util/easing';

/**
 * A collection of random utility functions.
 */
type RandomRangeProps = [number, number] | [[number, number]];

export const randomRange: (...props: RandomRangeProps) => number = (
  min,
  max = 0
) => {
  if (Array.isArray(min)) {
    return randomRange(min[0], min[1]);
  } else if (!max) {
    return randomRange(0, min);
  }

  return Math.random() * (max - min) + min;
};

export const weightedRange = (min: number, max: number, ease?: Ease) => {
  ease = ease ?? easeInOutExpo;
  return min + (max - min) * ease(Math.random());
};

/**
 * Returns a random integer between min and max (inclusive).
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(randomRange(min, max + 1));
};

/**
 * Returns a random boolean with a weighted ratio.
 */
export const randomBoolean = (ratio: number = 0.5) =>
  Math.random() < clamp(ratio);

/**
 * Returns a random element from the array.
 */
export const randomElement = <T>(array: T[]): T => {
  return array[randomInt(0, array.length - 1)];
};

/**
 * Returns a random color.
 */
export const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const randomVector = (min: [number, number], max?: [number, number]) => {
  if (!max) {
    max = min;
    min = [0, 0];
  }
  return [randomRange(min[0], max[0]), randomRange(min[1], max[1])] as [
    number,
    number
  ];
};
