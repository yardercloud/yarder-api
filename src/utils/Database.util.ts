import { map, omit } from 'lodash'

export default class DatabaseUtil {
  public static queryToMatchAll (query: any) {
    const fields = omit(query, ['from', 'size'])
    const must = map(fields, (value: string, key: string) => {
      return { match: { [key]: value } }
    })
    return { bool: { must } }
  }
}
