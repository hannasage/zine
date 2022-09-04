/** FEATURE: Describe your feature
 * */ import { useCallback, useEffect } from "react";

import { usePageContext } from "../../components";

export const usePageControls = (index: number) => {
  const { scrollToRef } = usePageContext();
  /* Page back to previous image(s) */
  const scrollUp = useCallback(() => {
    // if (index === 0) return;
    scrollToRef(index - 1);
  }, [index, scrollToRef]);

  const scrollDown = useCallback(() => {
    scrollToRef(index + 1);
  }, [index, scrollToRef]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "ArrowUp") {
        console.log("Logging");
        return scrollUp();
      }
      if (e.code === "ArrowDown") {
        return scrollDown();
      }
    },
    [scrollDown, scrollUp]
  );

  return useEffect(() => {
    window.addEventListener("keyup", handleKeyDown);
    // cleanup this component
    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, [handleKeyDown]);
};
