/*
 * The ground a scene stands on. Ink is the home page's hero in frames: an
 * ink ground under a lamp, the corners in shadow. Bone is the paper v1.1
 * opens on. Over either, the teaser's riso grain, reseeded every other
 * frame so it lives like film instead of sitting on the glass, and the same
 * on every render of the same frame.
 */
import type { ReactNode } from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { COLORS, LAMP, type Tone } from '@/lib/tokens'

type Props = { tone?: Tone; children?: ReactNode }

export function Stage({ tone = 'ink', children }: Props) {
  return (
    <AbsoluteFill
      style={
        tone === 'ink'
          ? {
              color: COLORS.bone,
              backgroundColor: COLORS.ground,
              backgroundImage: `radial-gradient(120% 90% at 50% 42%, ${LAMP.lit} 0%, ${LAMP.mid} 55%, ${LAMP.shadow} 100%)`,
            }
          : { color: COLORS.ink, backgroundColor: COLORS.bone }
      }
    >
      {children}
      <Grain />
    </AbsoluteFill>
  )
}

/* The plate from apps/web, with a seed, laid over the same way: white
 * noise at 7%, in overlay, so it reads as paper and never as snow. */
const noise = (seed: number) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='${seed}' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

function Grain() {
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill
      style={{
        backgroundImage: noise(Math.floor(frame / 2) % 24),
        opacity: 0.07,
        mixBlendMode: 'overlay',
      }}
    />
  )
}
