export default class EmptyZineError extends Error {
  constructor() {
    super(`No zine pages given. A minimum of 1 page is required for a zine.`);
    Object.setPrototypeOf(this, EmptyZineError.prototype);
  }
}
