export type Ease = (t: number) => number;

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;
const bounceOut = (t: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
};

export const linear = (t: number): number => t;

export const easeInQuad = (t: number): number => {
  return t * t;
};

export const easeOutQuad = (t: number): number => {
  return 1 - (1 - t) * (1 - t);
};

export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2;
};

export const easeInCubic = (t: number): number => {
  return t * t * t;
};

export const easeOutCubic = (t: number): number => {
  return 1 - pow(1 - t, 3);
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
};

export const easeInQuart = (t: number): number => {
  return t * t * t * t;
};

export const easeOutQuart = (t: number): number => {
  return 1 - pow(1 - t, 4);
};

export const easeInOutQuart = (t: number): number => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - pow(-2 * t + 2, 4) / 2;
};

export const easeInQuint = (t: number): number => {
  return t * t * t * t * t;
};

export const easeOutQuint = (t: number): number => {
  return 1 - pow(1 - t, 5);
};

export const easeInOutQuint = (t: number): number => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - pow(-2 * t + 2, 5) / 2;
};

export const easeInSine = (t: number): number => {
  return 1 - cos((t * PI) / 2);
};

export const easeOutSine = (t: number): number => {
  return sin((t * PI) / 2);
};

export const easeInOutSine = (t: number): number => {
  return -(cos(PI * t) - 1) / 2;
};

export const easeInExpo = (t: number): number => {
  return t === 0 ? 0 : pow(2, 10 * t - 10);
};

export const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - pow(2, -10 * t);
};

export const easeInOutExpo = (t: number): number => {
  return t === 0
    ? 0
    : t === 1
    ? 1
    : t < 0.5
    ? pow(2, 20 * t - 10) / 2
    : (2 - pow(2, -20 * t + 10)) / 2;
};

export const easeInCirc = (t: number): number => {
  return 1 - sqrt(1 - pow(t, 2));
};

export const easeOutCirc = (t: number): number => {
  return sqrt(1 - pow(t - 1, 2));
};

export const easeInOutCirc = (t: number): number => {
  return t < 0.5
    ? (1 - sqrt(1 - pow(2 * t, 2))) / 2
    : (sqrt(1 - pow(-2 * t + 2, 2)) + 1) / 2;
};

export const easeInBack = (t: number): number => {
  return c3 * t * t * t - c1 * t * t;
};

export const easeOutBack = (t: number): number => {
  return 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2);
};

export const easeInOutBack = (t: number): number => {
  return t < 0.5
    ? (pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
};

export const easeInElastic = (t: number): number => {
  return t === 0
    ? 0
    : t === 1
    ? 1
    : -pow(2, 10 * t - 10) * sin((t * 10 - 10.75) * c4);
};

export const easeOutElastic = (t: number): number => {
  return t === 0
    ? 0
    : t === 1
    ? 1
    : pow(2, -10 * t) * sin((t * 10 - 0.75) * c4) + 1;
};

export const easeInOutElastic = (t: number): number => {
  return t === 0
    ? 0
    : t === 1
    ? 1
    : t < 0.5
    ? -(pow(2, 20 * t - 10) * sin((20 * t - 11.125) * c5)) / 2
    : (pow(2, -20 * t + 10) * sin((20 * t - 11.125) * c5)) / 2 + 1;
};

export const easeInBounce = (t: number): number => {
  return 1 - bounceOut(1 - t);
};

export const easeOutBounce = bounceOut;

export const easeInOutBounce = (t: number): number => {
  return t < 0.5
    ? (1 - bounceOut(1 - 2 * t)) / 2
    : (1 + bounceOut(2 * t - 1)) / 2;
};
