/* The end card on its own under the chrome: a sting to close any clip. */
import { AbsoluteFill } from 'remotion'
import { Chrome } from '@/components/chrome'
import { EndCard, type EndCardProps } from '@/scenes/end-card'

export function EndCardCut(props: EndCardProps) {
  return (
    <AbsoluteFill>
      <EndCard {...props} />
      <Chrome release={`Peek ${props.version} · ${props.title}`} />
    </AbsoluteFill>
  )
}
