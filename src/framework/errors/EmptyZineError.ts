/** Throwable error for when a zine configuration array is empty.
 *
 * @example
 * if (zine.images.length === 0)
 *     throw new EmptyZineError();
 */
export default class EmptyZineError extends Error {
  constructor() {
    super(`No zine pages given. A minimum of 1 page is required for a zine.`);
    Object.setPrototypeOf(this, EmptyZineError.prototype);
  }
}
