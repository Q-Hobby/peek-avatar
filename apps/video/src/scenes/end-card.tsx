/*
 * The last beat of a launch, as v1.1 closed: "Peek", the version in a bone
 * pill, a middle dot, the release's name, and one face peeking over the
 * line. Under it, the site and the package behind a signal dot.
 *
 * The line rises out of a blur. Once it has settled the face comes up
 * behind the dot on LAND, looks down the line at the version, then turns
 * to the viewer. It is always a triangle, so the line cuts it just under
 * the eyes; the name picks everything else.
 */
import { Peek } from '@doan-labs/peek'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { Dot } from '@/components/chrome'
import { Lift, Rise } from '@/components/rise'
import { Stage } from '@/components/stage'
import { PACKAGE, SITE } from '@/lib/brand'
import { FONTS } from '@/lib/fonts'
import { CURVE, LAND } from '@/lib/motion'
import { COLORS } from '@/lib/tokens'

export type EndCardProps = {
  /** As "2.0.0". */
  version: string
  /** The release's name, as "Vue and Svelte". */
  title: string
  /** Whose face peeks over the line. */
  name: string
}

export function EndCard({ version, title, name }: EndCardProps) {
  return (
    <Stage>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 72,
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.24em',
            fontFamily: FONTS.sans,
            fontSize: 128,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          <Rise text='Peek' delay={0.2} />
          <Lift
            delay={0.38}
            style={{
              padding: '0.14em 0.4em',
              borderRadius: 999,
              backgroundColor: COLORS.bone,
              color: COLORS.ink,
              fontFamily: FONTS.mono,
              fontSize: '0.46em',
              letterSpacing: 0,
            }}
          >
            v{version}
          </Lift>
          <span style={{ position: 'relative' }}>
            <Lift delay={0.44} style={{ color: COLORS.faint }}>
              ·
            </Lift>
            <Peeker name={name} at={1.5} />
          </span>
          <Rise text={title} delay={0.5} />
        </div>
        <Lift
          delay={1.1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            fontFamily: FONTS.mono,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: COLORS.muted,
          }}
        >
          {SITE}
          <Dot />
          {PACKAGE}
        </Lift>
      </div>
    </Stage>
  )
}

const SIZE = 280
/* How much of the box clears the line. The library seats every face on a
 * floor, so a triangle's eyes sit three quarters down its box; this cuts
 * just under them, glasses and all. */
const SHOWN = 0.84 * SIZE

/* One face behind the dot, cut flat along the top of the line. */
function Peeker({ name, at }: { name: string; at: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const up = spring({ frame, fps, delay: at * fps, config: LAND })
  const turn = [(at + 1.2) * fps, (at + 1.7) * fps]
  const ease = {
    easing: CURVE,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  } as const
  return (
    <span
      style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        width: SIZE,
        height: SHOWN,
        marginLeft: -SIZE / 2,
        overflow: 'hidden',
      }}
    >
      <span style={{ display: 'block', translate: `0 ${(1 - up) * SHOWN}px` }}>
        <Peek
          name={name}
          face='triangle'
          size={SIZE}
          frame='none'
          title={false}
          gaze={[
            interpolate(frame, turn, [-0.6, 0], ease),
            interpolate(frame, turn, [0.6, 0], ease),
          ]}
        />
      </span>
    </span>
  )
}
