export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
};

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export function easeOutQuartic(t: number) {
  return 1 - (--t) * t * t * t;
};

export function easeOutHexic(t: number) {
  return 1 - (--t) * t * t * t * t * t;
};