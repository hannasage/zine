import React from "react";

import { usePageContext } from "./PageProvider";
import { ZinePage } from "./ZinePage";

/** Controls the render flow of pages. */
export const Zine = () => {
  // Hook into available pages
  const { availablePages } = usePageContext();
  // Render each page
  return (
    <>
      {availablePages &&
        availablePages.map((config, idx) => (
          <ZinePage
            index={idx}
            config={config}
            key={`${idx}-${config.templateId}`}
          />
        ))}
    </>
  );
};
