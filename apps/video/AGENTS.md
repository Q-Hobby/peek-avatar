# Video

Peek's launch videos, in Remotion: React rendered to MP4, one frame at a
time. Every rule in the root `AGENTS.md` holds here; this file adds the ones
for video.

`CLAUDE.md` is a symlink to this file, and `.claude/skills/remotion` to the
root `.agents/skills/remotion`. Never replace either with a real file.

## Before a scene

- **Load the `remotion` skill.** It is Remotion's own, vendored at the
  version in `package.json`. Upgrade both together: `bun run upgrade` here,
  then copy `skills/remotion-best-practices` from `remotion-dev/skills` at
  the same version over `.agents/skills/remotion`.
- **Videos here are Remotion**, never HyperFrames, never `motion/react`.
- **Watch the past cuts first**, in `reference/` (out of git). If it is
  empty, ask Thanh for `v1.0.mp4` and `v1.1.mp4`.

## Where it is

- `src/root.tsx` registers every composition, one JSX node each, with its
  numbers and default props inline so Studio can edit them.
- `src/cuts/` is one file per video: `Chrome` at its root, the scenes in
  order under it.
- `src/scenes/` is one file per scene, each on its own `Stage`.
- `src/components/` holds what scenes share: `Stage`, `Chrome`, `Rise` and
  `Lift`, `DoanMark`.
- `src/lib/` holds tokens, fonts, motion and the printed names. Faces come
  from `@doan-labs/peek` itself.
- `public/` holds every file a scene loads (fonts, music, images), through
  `staticFile()`. Never import one from a package: bun keeps packages
  outside this folder, and Studio cannot serve them.
- Renders go to `out/`, out of git.

## Match the past cuts

- 1920x1080, 30 fps, H.264 yuv420p, AAC 48 kHz stereo, 17 to 18 seconds.
- A music bed under the whole cut, mastered to -14 LUFS integrated. No
  voice.
- The ink ground under the hero's lamp and grain. v1.1 opens on bone, then
  cuts to ink for good.
- v1.1's chrome runs the whole cut: the maker's lockup, the release behind
  a signal dot, the package, the clock.
- Lines in Inter Tight 600 at -0.04em. Labels in JetBrains Mono, uppercase,
  0.2em apart. Signal red is spent on dots only.
- Faces peek: cut flat by an edge or a line, looking at what matters.
- v1.0 told the product: the need, the install, the code, the knobs, a
  wall of names, the mark. v1.1 told one feature: an opener, one card per
  accessory with a 01 / 06 count, one claim per scene, a site tour, the
  end card. A new cut picks the shape that fits its release.

## Rules

- **A frame is a function of its number.** Drive everything with
  `useCurrentFrame()` through `interpolate()` or `spring()`. No CSS
  transitions or animations, no `motion/react`, no timers, no
  `Math.random()` (Remotion's `random(seed)` if it must vary).
- **Never `<Peek animate>`.** Its loop runs on wall time. Drive `gaze`,
  `expression` and the wardrobe from the frame instead.
- **Time in seconds, times `fps`** from `useVideoConfig()`. Raw frame
  counts belong in `root.tsx` only.
- **Curves and springs come from `lib/motion.ts`**, the page's own in
  frames. Never an inline easing.
- **Colours from `lib/tokens.ts`, fonts from `lib/fonts.ts`.** Never a hex
  in a scene. Importing `FONTS` loads the faces before any frame draws.
- **Mount `Chrome` once per cut**, outside every `Sequence`, so its clock
  reads the cut's time.
- **Facts on screen come from the changelog** in `apps/web/src/lib/docs.ts`:
  versions, features, counts. Print the package as `@doan-labs/peek`; v1.0
  shows the old `@doanlabs` scope, never copy it.
- **No em dash on screen either.** v1.1's end card had a dash; ours has a
  middle dot.

## Working here

```
bun run video                  # Studio, from the root
bun run video:render EndCard   # out/EndCard.mp4, from the root
```

Studio draws faces from `packages/peek/src`; a render bundles for
production and uses its `dist`, which `video:render` builds first.

Studio takes flags after the script, as `bun run video --no-open
--port=3007`. Behind an HTTPS link (`tailscale serve`) it plays and scrubs,
but it refuses to save props or start a render: it only trusts a page at
`http://` on its own host. Edit props in `root.tsx` and render from the
CLI instead.
