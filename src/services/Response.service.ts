import { Response } from 'express'

export default class ResponseService {
  public constructor (private response: Response) {}

  public ok (body: any) {
    return this.response.status(200).json(body)
  }

  public created (body: any) {
    return this.response.status(201).json(body)
  }

  public unauthorized (message: string) {
    const error = { message }
    return this.response.status(401).json(error)
  }

  public unprocessable (message: string) {
    const error = { message }
    return this.response.status(422).json(error)
  }

  public serverError (error: Error) {
    const message = `Something went wrong: ${error.message}`
    const response = { message }
    this.response.status(500).json(response)
  }
}
