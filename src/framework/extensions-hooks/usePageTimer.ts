import { useEffect } from "react";

import { usePageContext } from "../../components";

/** FEATURE: Pass in time (in milliseconds) and trigger the next available
 * page.
 *
 * @example
 * const MyPage = (props: ZinePageConfig) => {
 *   usePageTimer(props.viewTimeRequirement)
 * }
 * */
export const usePageTimer = (time: number) => {
  const { makeNextPageAvailable } = usePageContext();
  useEffect(() => {
    setTimeout(makeNextPageAvailable, time);
  }, []); //eslint-disable-line
};
