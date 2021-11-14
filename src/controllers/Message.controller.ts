import { Request, Response } from 'express'
import ValidationError from '../errors/Validation.error'
import ResponseService from '../services/Response.service'
import MessageRepository, { Message } from '../repositories/Message.repository'
import MessageValidation from '../validations/Message.validation'

export default class MessageController {
  private response: ResponseService
  private message: MessageRepository
  private validation: MessageValidation

  public constructor (request: Request, response: Response) {
    this.response = new ResponseService(response)
    this.message = new MessageRepository()
    this.validation = new MessageValidation(request)
  }

  public async create () {
    try {
      const { level, body } = this.validation.create()
      const data: Message = {
        level,
        body,
        timestamp: new Date()
      }
      const message = await this.message.create(data)
      this.response.created(message)
    } catch (error) {
      if (error instanceof ValidationError) {
        this.response.unprocessable(error.message)
      } else if (error instanceof Error) {
        this.response.serverError(error)
      }
    }
  }

  public async search () {
    try {
      const query = this.validation.search()
      const result = await this.message.search(query)
      this.response.ok(result)
    } catch (error) {
      if (error instanceof ValidationError) {
        this.response.unprocessable(error.message)
      } else if (error instanceof Error) {
        this.response.serverError(error)
      }
    }
  }
}
