import { useCallback, useEffect, useMemo, useState } from "react";

import { ZinePageConfig } from "../configs";

export interface PageFeatureController {
  availablePages: ZinePageConfig[];
  makeNextPageAvailable: () => void;
  resetAvailablePages: () => void;
}
/** FEATURE: This hook consumes your zine pages and gives you the
 * controller to create a user flows. The callback can be used on buttons,
 * or in tandem with a timer to trigger page reveals.
 *
 * ---
 *
 * This is used exclusively in `PageProvider` so it can be consumed
 * by any component in the app.
 * */
export const useAvailablePages = (
  pages: ZinePageConfig[]
): PageFeatureController => {
  // So we don't have to deal with refreshing issues!
  const stableProps = useMemo(() => pages, []); //eslint-disable-line
  const [allPages, setAllPages] = useState<ZinePageConfig[]>(stableProps);
  // Setting up the output array
  const [availablePages, setAvailable] = useState<ZinePageConfig[]>([]);
  // Makes first page available on first load
  useEffect(() => makeNextPageAvailable(), []); //eslint-disable-line
  // Shifts the first item off `allPages` and onto the end of `availablePages`
  const makeNextPageAvailable = useCallback(
    () =>
      setAvailable((state) => {
        const nextPage = allPages.shift();
        if (nextPage !== undefined) return [...state, nextPage];
        return state;
      }),
    [] //eslint-disable-line
  );
  // Hard reset of the state
  const resetAvailablePages = useCallback(() => {
    // Resets allPages back to full page list
    setAllPages(stableProps);
    // Empties the available
    setAvailable([]);
    // Makes the first page available
    makeNextPageAvailable();
  }, []); //eslint-disable-line
  // Returns the available pages and the ability to reveal the next page
  return { availablePages, makeNextPageAvailable, resetAvailablePages };
};
