import SearchEngine, {
  SearchEngineSearchQuery
} from '../databases/SearchEngine.database'

export enum MessageLevel {
  Emergency ='emergency',
  Alert ='alert',
  Critical ='critical',
  Error ='error',
  Warning ='warning',
  Notice ='notice',
  Info ='info',
  Debug ='debug'
}

export interface Message {
  level: MessageLevel
  body: string
  timestamp: Date
}

interface MessageSearchQuery extends SearchEngineSearchQuery {
  level?: MessageLevel
  body?: string
  timestamp?: Date
}

export default class LogRepository {
  private searchEngine: SearchEngine

  public constructor () {
    this.searchEngine = new SearchEngine('messages')
  }

  public static get levels () {
    return Object.values(MessageLevel)
  }

  public create (message: Message) {
    return this.searchEngine.create(message)
  }

  public search (query: MessageSearchQuery) {
    return this.searchEngine.search(query)
  }
}
