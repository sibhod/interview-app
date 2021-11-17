// Returns a random number between min and max

export const randomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
