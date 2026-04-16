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
