import { NextFunction, Request, Response } from 'express'
import { includes } from 'lodash'
import ResponseService from '../services/Response.service'
import EnvUtil from '../utils/Env.util'

const errors = {
  invalidKey: 'Invalid Yarder key',
  invalidOrigin: 'Not permitted Yarder origin'
}

export default class AuthMiddleware {
  private static verifyKey (request: Request) {
    const key = request.headers['yarder-api-key'] as string
    const validKey = EnvUtil.get('YARDER_KEY')
    if (validKey !== key) throw new Error(errors.invalidKey)
  }

  private static verifyOrigin (request: Request) {
    const host = request.hostname
    const validOrigins = EnvUtil.corsEnabledHosts()
    if (!includes(validOrigins, host)) throw new Error(errors.invalidOrigin)
  }

  public static verify (request: Request, response: Response, next: NextFunction) {
    try {
      AuthMiddleware.verifyKey(request)
      AuthMiddleware.verifyOrigin(request)
      next()
    } catch (error: any) {
      new ResponseService(response).unauthorized(error.message)
    }
  }
}
