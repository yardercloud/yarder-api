import { map } from 'lodash'

export default class EnvUtil {
  public static get (env: string) {
    return process.env[env] as string
  }

  public static corsEnabledUrls () {
    const envs = ['YARDER_HOST_URL', 'YARDER_ORIGIN_URL']
    return map(envs, env => EnvUtil.get(env))
  }

  public static corsEnabledHosts () {
    const urls = EnvUtil.corsEnabledUrls()
    return map(urls, url => new URL(url).hostname)
  }
}
