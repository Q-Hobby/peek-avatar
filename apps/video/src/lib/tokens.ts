/* The site's palette as literals: Remotion draws outside StyleX. Keep each
 * equal to the token of the same name in apps/web/src/lib/tokens.stylex.ts,
 * or in lib/inks.ts for ink. Never a hex in a scene. */
export const COLORS = {
  ground: '#121110',
  bone: '#F3F0E8',
  muted: '#878178',
  faint: '#4A4640',
  signal: '#EE5B46',
  fog: '#C8D6E8',
  clay: '#F1CDBF',
  lav: '#D8CDF0',
  // type on a bone scene, and its quiet labels (the sheet's --fg, --quiet)
  ink: '#1A1918',
  quiet: '#706B65',
} as const

/* The hero's lamp: lit over the middle, the corners in shadow. The same
 * stops as its radial gradient in apps/web/src/components/home-page.tsx. */
export const LAMP = {
  lit: '#1E1C1A',
  mid: COLORS.ground,
  shadow: '#0A0909',
} as const

/** Which ground a scene stands on: v1.1 opens on bone, then goes to ink. */
export type Tone = 'ink' | 'bone'
