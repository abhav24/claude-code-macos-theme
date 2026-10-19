# Claude Code macOS App Theme

A monochrome, high-contrast black theme for the Claude desktop app, with glowing blue embers drifting up behind the conversation.

- **Pure black** surfaces with white text and a neutral gray accent
- **Animated backdrop** of ~90 blue embers rising along the sides of the window, over a soft blue glow from the bottom corners
- **Lightweight**: no SVG filters, one transform/opacity animation per ember, and nothing full-screen that animates
- **Respects reduced motion**: the embers stop when your system asks for less motion

The theme draws in the Claude desktop and mobile apps. The terminal and editor integrations don't draw themes.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install theme-pack --marketplace abhav24/claude-code-macos-theme
```

Answer `y` to add the marketplace, then pick a scope (user is first; press Enter).

From a shell:

```bash
claude plugin install theme-pack --marketplace abhav24/claude-code-macos-theme
```

In the desktop app, where `/plugin` doesn't run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `abhav24/claude-code-macos-theme`, then **Add plugin**.

Start a new session afterwards to see it.

## Customize

- `hooks/themes.ts`: the interface colors (surfaces, text, accent).
- `hooks/embers.ts`: the backdrop. Change `SHADES` for the ember colors, `COUNT` for how many there are, and the `dur` range for how fast they rise.
- `hooks/register.tsx`: how see-through the panels are over the backdrop (`glass`).

## License

MIT
