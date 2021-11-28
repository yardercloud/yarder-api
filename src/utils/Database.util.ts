import { isEmpty, map, omit, omitBy } from 'lodash'

export default class DatabaseUtil {
  public static queryToMatchAll (query: any) {
    const fields = () => {
      const unwantedFieldsRemoved = omit(query, ['from', 'size'])
      const emptyFieldsRemoved = omitBy(unwantedFieldsRemoved, isEmpty)
      return emptyFieldsRemoved
    }
    const must = map(fields(), (value: string, key: string) => {
      return { match: { [key]: value } }
    })
    return { bool: { must } }
  }
}
