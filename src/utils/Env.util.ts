import { map } from 'lodash'

export default class EnvUtil {
  public static get (env: string) {
    return process.env[env] as string
  }

  public static origins () {
    const envs = ['YARDER_HOST', 'YARDER_ORIGIN']
    return map(envs, env => EnvUtil.get(env))
  }
}
