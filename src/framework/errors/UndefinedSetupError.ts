export default class UndefinedSetupError extends Error {
  constructor(message: string) {
    super(`Could not find setup for ${message}`);
    Object.setPrototypeOf(this, UndefinedSetupError.prototype);
  }
}
