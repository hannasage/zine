/** Logs options for debugging */
function debugOptions(options) {
  if (options.debug) console.log(options);
}
/** Middleware to validate incoming type argument
 * @param type {string} Type argument from CLI
 * @return void
 * */
function invalidTypeCheck(type) {
  console.error(`ERROR: <type> must be either logic or block: given "${type}"`);
}

function makeComponent(type, name, debug) {}

module.exports = {
  invalidTypeCheck,
  makeComponent,
  debugOptions,
};
