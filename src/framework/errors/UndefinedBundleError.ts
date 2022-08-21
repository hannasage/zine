export default class UndefinedBundleError extends Error {
  constructor(message: string) {
    super(`Could not find template from id: ${message}`);
    Object.setPrototypeOf(this, UndefinedBundleError.prototype);
  }
}
