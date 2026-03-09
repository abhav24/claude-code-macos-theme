import { makeColors } from './make-colors.js'

// Monochrome high-contrast black. Dark only, no colored accent:
// the accent is a neutral gray, so highlights read as white-on-black.
const { theme, problems } = makeColors({
  label: 'Ember',
  only: 'dark',
  contrast: 'more',
  roles: { accent: '#9a9a9a', danger: '#e0564a', success: '#7fb069', warning: '#e0a83a', pro: '#b0b0b0' },
  dark: {
