/** Middleware for logging CLI options in debug mode
 * @param options {any} Options object from CLI
 * */
function debugOptions(options) {
  if (options?.debug) console.log(options);
}
/** Log items in the debug log
 * @param debug {boolean} Debug option from CLI
 * @param items {...any[]} Items to log
 * */
function debugLog(debug, ...items) {
  if (debug) items.map((item) => console.log(`debugLog: ${item}`));
}

module.exports = {
  debugLog,
  debugOptions,
};
