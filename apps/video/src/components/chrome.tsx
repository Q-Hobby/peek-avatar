/*
 * The four corner stamps v1.1 ran the whole cut under, the site's own file
 * stamp: the maker's lockup top left, the release top right behind a
 * signal dot, the package bottom left, the clock bottom right. They never
 * move; the clock counts.
 *
 * Mount it once, at the root of a cut and outside every Sequence, so the
 * clock reads the cut's time and not a scene's.
 */
import type { CSSProperties, ReactNode } from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { DoanMark } from '@/components/doan-mark'
import { PACKAGE } from '@/lib/brand'
import { FONTS } from '@/lib/fonts'
import { COLORS, type Tone } from '@/lib/tokens'

/* Off the edges, as v1.1 set them. */
const INSET = { x: 40, y: 34 }

type Props = {
  /** The top right stamp, as "Peek 1.1.0 · Accessories". */
  release: string
  tone?: Tone
}

export function Chrome({ release, tone = 'ink' }: Props) {
  const quiet = tone === 'ink' ? COLORS.muted : COLORS.quiet
  const loud = tone === 'ink' ? COLORS.bone : COLORS.ink
  return (
    <AbsoluteFill style={{ color: quiet }}>
      <Corner place={{ top: INSET.y, left: INSET.x }}>
        A product by
        <span style={{ display: 'inline-flex', gap: 8, color: loud }}>
          <DoanMark size={14} />
          Doan Labs
        </span>
      </Corner>
      <Corner place={{ top: INSET.y, right: INSET.x }}>
        <Dot />
        {release}
      </Corner>
      <Corner place={{ bottom: INSET.y, left: INSET.x }}>{PACKAGE}</Corner>
      <Corner place={{ bottom: INSET.y, right: INSET.x }}>
        <Clock />
      </Corner>
    </AbsoluteFill>
  )
}

function Corner({
  place,
  children,
}: {
  place: CSSProperties
  children: ReactNode
}) {
  return (
    <span
      style={{
        position: 'absolute',
        ...place,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: FONTS.mono,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '0.2em',
        lineHeight: 1,
        textTransform: 'uppercase',
        fontVariantNumeric: 'tabular-nums',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

/** The signal red, spent on dots. */
export function Dot({ size = 6 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: COLORS.signal,
      }}
    />
  )
}

/* "T 03.3 S": the cut's time in seconds, to a tenth. */
function Clock() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return <>T {(frame / fps).toFixed(1).padStart(4, '0')} S</>
}
