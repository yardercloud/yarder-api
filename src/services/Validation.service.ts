import { Request } from 'express'
import Joi from 'joi'
import ValidationError from '../errors/Validation.error'

export default class ValidationService {
  private request: Request

  public constructor (request: Request) {
    this.request = request
  }

  private validate (schema: Joi.ObjectSchema, body: any) {
    const { error, value } = schema.validate(body)
    if (error) throw new ValidationError(error.message)
    return value
  }

  public body (schema: Joi.ObjectSchema) {
    return this.validate(schema, this.request.body)
  }

  public query (schema: Joi.ObjectSchema) {
    return this.validate(schema, this.request.query)
  }
}
