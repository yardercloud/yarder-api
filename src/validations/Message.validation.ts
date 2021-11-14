import { Request } from 'express'
import Joi from 'joi'
import MessageRepository from '../repositories/Message.repository'
import ValidationService from '../services/Validation.service'

export default class MessageValidation {
  private validation: ValidationService
  private schemas = {
    from: Joi.number(),
    size: Joi.number(),
    level: Joi.string().valid(...MessageRepository.levels),
    body: Joi.string()
  }

  public constructor (request: Request) {
    this.validation = new ValidationService(request)
  }

  public create () {
    const schema = Joi.object({
      level: this.schemas.level.required(),
      body: this.schemas.body.required()
    })
    return this.validation.body(schema)
  }

  public search () {
    const schema = Joi.object({
      from: this.schemas.from.required(),
      size: this.schemas.size.required(),
      level: this.schemas.level.optional(),
      body: this.schemas.body.optional()
    })
    return this.validation.query(schema)
  }
}
