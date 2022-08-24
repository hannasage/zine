/** Throwable error for when a template has no defined setup in the
 * `templates` module export.
 *
 * @example
 * if (bundledTemplate === undefined)
 *     throw new UndefinedSetupError();
 */
export default class UndefinedSetupError extends Error {
  constructor(message: string) {
    super(`Could not find setup for ${message}`);
    Object.setPrototypeOf(this, UndefinedSetupError.prototype);
  }
}
