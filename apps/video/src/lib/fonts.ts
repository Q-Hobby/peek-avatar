/* The site's two faces: in public/fonts, copies of the latin subsets
 * apps/web loads from @fontsource-variable 5.3.0, each with its licence.
 * loadFont holds every frame until its face is ready, so nothing renders in
 * a fallback. They live in public/ because Studio cannot serve a file from
 * a package: bun keeps those outside this folder. */
import { loadFont } from '@remotion/fonts'
import { staticFile } from 'remotion'

export const FONTS = {
  sans: 'Inter Tight Variable',
  mono: 'JetBrains Mono Variable',
} as const

loadFont({
  family: FONTS.sans,
  url: staticFile('fonts/inter-tight-variable.woff2'),
  weight: '100 900',
})
loadFont({
  family: FONTS.mono,
  url: staticFile('fonts/jetbrains-mono-variable.woff2'),
  weight: '100 800',
})
