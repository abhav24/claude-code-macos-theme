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

const embers = Array.from({ length: COUNT }, () => {
  // 70% along the sides, 30% through the middle.
  const zone = rand()
  const x = zone < 0.35 ? r(0, W * 0.3) : zone < 0.7 ? r(W * 0.7, W) : r(W * 0.3, W * 0.7)
  const big = rand() < 0.18
  // Radius includes the glow halo, so it's ~4x the visible core.
  const size = big ? r(14, 22) : r(6, 12)
  const dur = r(10, 22)
  const delay = -r(0, dur)
  const drift = r(-120, 120)
  const peak = r(0.65, 1)
  const shade = Math.floor(rand() * SHADES.length)
  return `<circle class="e" cx="${f(x)}" cy="${H + 30}" r="${f(size)}" fill="url(#k${shade})" style="--d:${f(dur)}s;--dl:${f(delay)}s;--dx:${f(drift)}px;--o:${peak.toFixed(2)}"/>`
}).join('')

export const EMBERS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs>
${glows}
<radialGradient id="gl" cx="0" cy="1" r="0.8"><stop offset="0" stop-color="#5aa8ff" stop-opacity="0.32"/><stop offset="0.5" stop-color="#2f6ad0" stop-opacity="0.11"/><stop offset="1" stop-color="#000000" stop-opacity="0"/></radialGradient>
<radialGradient id="gr" cx="1" cy="1" r="0.8"><stop offset="0" stop-color="#5aa8ff" stop-opacity="0.28"/><stop offset="0.5" stop-color="#2f6ad0" stop-opacity="0.09"/><stop offset="1" stop-color="#000000" stop-opacity="0"/></radialGradient>
<linearGradient id="gb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#5a9cff" stop-opacity="0.16"/><stop offset="0.35" stop-color="#5a9cff" stop-opacity="0"/></linearGradient>
</defs>
<style>
.e{opacity:0;will-change:transform,opacity;animation:rise var(--d) linear var(--dl) infinite}
@keyframes rise{
0%{transform:translate(0,0);opacity:0}
8%{opacity:var(--o)}
50%{transform:translate(var(--dx),-540px)}
75%{opacity:calc(var(--o)*0.7)}
100%{transform:translate(calc(var(--dx)*-0.5),-1090px);opacity:0}
}
@media (prefers-reduced-motion:reduce){.e{animation:none}}
</style>
<rect width="${W}" height="${H}" fill="#000000"/>
<rect width="${W}" height="${H}" fill="url(#gl)"/>
<rect width="${W}" height="${H}" fill="url(#gr)"/>
<rect width="${W}" height="${H}" fill="url(#gb)"/>
${embers}
</svg>`
