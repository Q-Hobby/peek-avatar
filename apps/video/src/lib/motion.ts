/*
 * The site's vocabulary for movement (apps/web/src/lib/motion.ts), in
 * frames. Motion's springs and Remotion's take the same stiffness, damping
 * and mass, so a piece lands in a video the way it lands on the page. Keep
 * the numbers equal to the page's.
 *
 * Curves for anything that only fades or travels a fixed distance:
 * `interpolate(frame, [a, b], [0, 1], { easing: CURVE })`. Springs for
 * anything with weight: `spring({ frame, fps, config: LAND })`.
 */
import { Easing } from 'remotion'

/** The page's curve: a long, quiet settle. */
export const CURVE = Easing.bezier(0.22, 1, 0.36, 1)

/** A piece landing: quick, settled, no visible overshoot. */
export const LAND = { stiffness: 420, damping: 32, mass: 0.9 } as const

/** The mark's quarter turn: heavy, one soft overshoot and nothing after. */
export const TURN = { stiffness: 90, damping: 15, mass: 1.1 } as const
