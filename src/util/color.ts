/**
 * Convert a hex string to a css rgba string
 * @param {color} hex color value
 * @param {alpha}  alpha normalized alpha
 * @returns {String} rgba string
 */

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};
