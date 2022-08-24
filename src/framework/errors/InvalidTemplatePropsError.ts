/** Throwable error for creating rules. If a props rule is not met,
 * throw this error in the function.
 *
 * @example
 * if (given !== expected)
 *     throw new InvalidTemplatePropsError(message);
 */
export default class InvalidTemplatePropsError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidTemplatePropsError.prototype);
  }
}
