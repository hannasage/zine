export default class InvalidPropsError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidPropsError.prototype);
  }
}
