import { useEffect, useState } from "react";
/** FEATURE: Pass in time (in `ms`) and receive a boolean trigger that flips after the
 * given amount of time. Use the boolean returned from this as an effect trigger to trigger a view
 * timer event. For example, releasing the next page of a Zine after viewing
 * the current one `n` seconds.
 *
 * @example
 * const MyComponent = () => {
 *    const catalyst = useViewTimer(1000)
 *    useEffect(() => doThisAction(), [catalyst])
 *    // ...
 * }
 *
 * @param timeToView {number} The number of milliseconds before releasing the
 * next page */
export const useTimedCatalyst = (timeToView: number) => {
  const [catalyst, setCatalyst] = useState(false);
  const trigger = () => setCatalyst((state) => !state);
  useEffect(() => {
    setTimeout(trigger, timeToView);
  }, [timeToView]);
  return catalyst;
};
