/*
 * Every composition, one JSX node each, with its size, rate, length and
 * default props written inline so Studio can edit them in place. 1920x1080
 * at 30 fps, as v1.0 and v1.1 shipped.
 */
import { Composition } from 'remotion'
import { EndCardCut } from '@/cuts/end-card'

export function Root() {
  return (
    <Composition
      id='EndCard'
      component={EndCardCut}
      durationInFrames={135}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ version: '2.0.0', title: 'Vue and Svelte', name: 'Peek' }}
    />
  )
}
