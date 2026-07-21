import type { Register } from 'claude-code'

import { EMBERS_SVG } from './embers.js'
import { EMBER } from './themes.js'

const SCENE = 'embers'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = EMBER.problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) $.ui.toast(unpainted)

    const set = await $.theme.set({
      colors: EMBER.colors,
      backdrop: { scene: SCENE, glass: { blur: 0, tint: '#000000', opacity: 0 } },
    })
