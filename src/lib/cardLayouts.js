const wrap = (value, count) => (((value + count / 2) % count) + count) % count - count / 2;

const focusScale = (d) => Math.max(0.6, 1 - Math.min(Math.abs(d), 2) * 0.14);

// `phase` is a continuous value in [0, count). Card i is at the focus when phase ≈ i.
// d = signed continuous distance of card i from the focus, so cards slide along the
// layout's actual circuit as phase advances.
export const layoutPose = (layout, index, phase, count, compact, breath = 1) => {
  const d = wrap(index - phase, count);
  const rx = compact ? 130 : 250;
  const ry = compact ? 95 : 165;
  const s = focusScale(d);

  if (layout === "circle") {
    const a = (d / count) * Math.PI * 2;
    return { x: Math.sin(a) * rx, y: Math.cos(a) * ry, rotate: -Math.sin(a) * 10, scale: s, zIndex: Math.round(50 - Math.abs(d) * 7), opacity: 1 };
  }
  if (layout === "conveyor") {
    return { x: d * 210, y: Math.abs(d) < 0.5 ? -12 : 30, rotate: 0, scale: s, zIndex: Math.round(40 - Math.abs(d) * 2), opacity: Math.abs(d) > 2.6 ? 0.3 : 1 };
  }
  // infinity
  const t = d * (Math.PI * 2 / count);
  const front = Math.cos(t);
  return { x: Math.sin(t) * rx, y: Math.sin(2 * t) * (compact ? 52 : 86), rotate: -Math.sin(t) * 8, scale: 0.62 + 0.4 * ((front + 1) / 2), zIndex: Math.round(40 + front * 15), opacity: 0.5 + 0.5 * ((front + 1) / 2) };
};
