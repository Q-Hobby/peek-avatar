/*
 * The CLI's config: Studio, render and still all read it. The Node render
 * APIs do not, so a script that renders through them passes these itself.
 * Every option: https://remotion.dev/docs/config
 */
import path from 'node:path'
import { Config } from '@remotion/cli/config'

Config.setRspack(true)
Config.setVideoImageFormat('jpeg')
Config.setOverwriteOutput(true)
Config.setDefaultPremountInSeconds(2)

// @/ is src/, the same alias as apps/web and tsconfig.json
Config.overrideBundlerConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: { ...config.resolve?.alias, '@': path.join(process.cwd(), 'src') },
  },
}))
