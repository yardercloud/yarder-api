import { Client } from '@elastic/elasticsearch'
import { RequestBody } from '@elastic/elasticsearch/lib/Transport'
import DatabaseUtil from '../utils/Database.util'

export interface SearchEngineSearchQuery {
  from: string
  size: string
}

export default class SearchEngine {
  private static client: Client | null
  private index: string

  constructor (index: string) {
    this.index = index
  }

  private static get connection () {
    if (this.client) {
      return this.client
    } else {
      const config = { node: 'http://127.0.0.1:9200' }
      this.client = new Client(config)
      return this.client
    }
  }

  public async find (id: string) {
    const query = { index: this.index, id }
    const response = await SearchEngine.connection.get(query)
    return response.body._source
  }

  public async create (body: RequestBody) {
    const query = { index: this.index, body }
    const response = await SearchEngine.connection.index(query)
    const id = response.body._id
    return this.find(id)
  }

  public async search (query: SearchEngineSearchQuery) {
    const matchAll = DatabaseUtil.queryToMatchAll(query)
    const body = {
      sort: { timestamp: 'desc' },
      query: matchAll,
      from: query.from,
      size: query.size
    }
    const search = { index: this.index, body }
    const response = await SearchEngine.connection.search(search)
    return response.body.hits.hits.map((hit: any) => hit._source)
  }
}
