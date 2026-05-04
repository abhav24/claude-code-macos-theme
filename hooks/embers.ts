// Drifting embers: a glowing rise of blue sparks over black, heaviest at
// the sides, with a still cool glow from the bottom corners.
//
// Built to be cheap to draw: no SVG filters (the glow is a pre-drawn radial
// gradient each ember is filled with), one animation per ember touching only
// transform and opacity, and nothing full-screen that animates.

// Deterministic pseudo-random so the scene is the same every load.
let seed = 7
const rand = () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}
const r = (min: number, max: number) => min + rand() * (max - min)
const f = (n: number) => n.toFixed(1)

const W = 1600
const H = 1000
const COUNT = 90

// One glow gradient per shade: bright core fading to nothing.
const SHADES = ['#6ab4ff', '#7fc4ff', '#9ad6ff', '#5aa2ff', '#b4e6ff']
const glows = SHADES.map(
  (c, i) =>
    `<radialGradient id="k${i}"><stop offset="0" stop-color="#eaf6ff"/><stop offset="0.18" stop-color="${c}"/><stop offset="0.45" stop-color="${c}" stop-opacity="0.35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`,
).join('')
