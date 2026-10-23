/*
 * A line that rises a letter at a time out of a blur, the way the teaser's
 * title settles and the home page's line still does. Each letter lifts
 * 0.42em, sharpens from 12px and fades in over 1.1s on CURVE, 0.03s after
 * the one before, with two letters' rest between words. The same numbers
 * as home-page.tsx. Lift does the same to anything that is not text, as
 * one piece.
 *
 * Both start on their own frame 0, plus `delay` in seconds. Words stay
 * whole, so a long line breaks between them.
 */
import { type CSSProperties, Fragment, type ReactNode } from 'react'
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { CURVE } from '@/lib/motion'

/* One letter's pose at `frame`, starting at frame `at`. */
function pose(frame: number, at: number, fps: number): CSSProperties {
  const p = interpolate(frame, [at, at + 1.1 * fps], [0, 1], {
    easing: CURVE,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  return {
    display: 'inline-block',
    opacity: p,
    translate: `0 ${0.42 * (1 - p)}em`,
    filter: `blur(${12 * (1 - p)}px)`,
  }
}

type RiseProps = { text: string; delay?: number; style?: CSSProperties }

export function Rise({ text, delay = 0, style }: RiseProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const words = text.split(' ')
  return (
    // room for the blur to spill without clipping
    <span
      style={{ display: 'inline-block', paddingBottom: '0.08em', ...style }}
    >
      {words.map((word, w) => {
        const before = [...words.slice(0, w).join('')].length
        return (
          <Fragment key={w}>
            {w > 0 && ' '}
            <span style={{ whiteSpace: 'nowrap' }}>
              {[...word].map((letter, i) => (
                <span
                  key={i}
                  style={pose(
                    frame,
                    (delay + (before + i + w * 2) * 0.03) * fps,
                    fps,
                  )}
                >
                  {letter}
                </span>
              ))}
            </span>
          </Fragment>
        )
      })}
    </span>
  )
}

type LiftProps = { delay?: number; style?: CSSProperties; children: ReactNode }

export function Lift({ delay = 0, style, children }: LiftProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return (
    <span style={{ ...pose(frame, delay * fps, fps), ...style }}>
      {children}
    </span>
  )
}
