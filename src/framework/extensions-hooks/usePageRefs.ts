import { MutableRefObject, useCallback, useState } from "react";

interface PageRef {
  ref: MutableRefObject<any>;
  index: number;
}
export interface PageRefController {
  sendRefToProvider: (ref: MutableRefObject<any>, index: number) => void;
  scrollToRef: (index: number) => void;
}

/** FEATURE: Lets a page find and scroll to the desire zine page's ref.
 * */
export const usePageRefs = () => {
  const [refs, addToRefs] = useState<PageRef[]>([]);
  // Used to push refs up to hook state
  const sendRefToProvider = useCallback(
    (ref: MutableRefObject<any>, index: number) => {
      const newRefItem: PageRef = { ref, index };
      addToRefs((state) => [...state, newRefItem]);
    },
    []
  );
  // Used to scroll to any ref from any page in a zine
  const scrollToRef = useCallback(
    (index: number) => {
      const refToScrollTo = refs.find((ref) => ref.index === index);
      if (refToScrollTo !== undefined) {
        console.log(refToScrollTo, index);
        refToScrollTo.ref.current.scrollIntoView();
      } else {
        console.warn(`Ref not found at index: ${index}`);
      }
    },
    [refs]
  );

  return {
    sendRefToProvider,
    scrollToRef,
  };
};
