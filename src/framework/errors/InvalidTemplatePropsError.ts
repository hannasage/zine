export default class InvalidTemplatePropsError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidTemplatePropsError.prototype);
  }
}
