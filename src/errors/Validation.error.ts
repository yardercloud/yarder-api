export default class ValidationError extends Error {
  public constructor (message: string) {
    super(message)
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
