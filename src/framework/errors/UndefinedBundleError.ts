export default class UndefinedBundleError extends Error {
  constructor(message: string) {
    super(`Could not find bundle from templateId: ${message}`);
    Object.setPrototypeOf(this, UndefinedBundleError.prototype);
  }
}
