import { useCallback, useEffect, useMemo, useState } from "react";

import { ZinePageConfig } from "../configs";

export interface PageFeatureController {
  availablePages: ZinePageConfig[];
  makeNextPageAvailable: () => void;
  resetAvailablePages: () => void;
}
export const useAvailablePages = (
  pages: ZinePageConfig[]
): PageFeatureController => {
  const allPages = useMemo(() => pages, []); //eslint-disable-line
  // The available pages to render
  const [availablePages, setAvailable] = useState<ZinePageConfig[]>([]);

  useEffect(() => makeNextPageAvailable(), []); //eslint-disable-line

  const makeNextPageAvailable = useCallback(
    () =>
      setAvailable((state) => {
        const nextPage = allPages.shift();
        if (nextPage !== undefined) return [...state, nextPage];
        return state;
      }),
    [] //eslint-disable-line
  );
  const resetAvailablePages = useCallback(() => setAvailable([]), []);

  // Returns the available pages and the ability to reveal the next page
  return { availablePages, makeNextPageAvailable, resetAvailablePages };
};
