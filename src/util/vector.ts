export const average = (vectors: [[number, number], ...[number, number][]]) => {
  const len = vectors.length;
  return vectors.reduce(
    (acc, curr) => {
      return [acc[0] + curr[0] / len, acc[1] + curr[1] / len];
    },
    [0, 0]
  );
};

export const distance = ([a, b]: [[number, number], [number, number]]) =>
  Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

export const normalize = ([x, y]: [number, number]) => {
  const length = Math.sqrt(x * x + y * y);
  return [x / length, y / length];
};

export const dot = ([a, b]: [[number, number], [number, number]]) =>
  a[0] * b[0] + a[1] * b[1];

export const rotate = ([x, y]: [number, number], angle: number) => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return [x * cos - y * sin, x * sin + y * cos];
};

export const scale = ([x, y]: [number, number], factor: number) => [
  x * factor,
  y * factor,
];

export const translate = (
  [x, y]: [number, number],
  [tx, ty]: [number, number]
) => [x + tx, y + ty];

export const vectorLength = ([x, y]: [number, number]) =>
  Math.sqrt(x * x + y * y);

export const vectorSum = ([a, b]: [[number, number], [number, number]]) => [
  a[0] + b[0],
  a[1] + b[1],
];
