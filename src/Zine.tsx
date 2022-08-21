import React from "react";

import TemplateErrorBoundary from "./components/TemplateErrorBoundary";
import { useAvailablePages } from "./framework";
import SampleZine from "./_data/SampleZine";
import { ZinePage } from "./components/ZinePage";

/** Controls the render flow of pages. */
function Zine() {
  const pages = useAvailablePages(SampleZine); // Currently just returns PAGES
  return (
    <TemplateErrorBoundary>
      {pages.map((config, idx) => (
        <ZinePage key={`${idx}-${config.templateId}`} {...config} />
      ))}
    </TemplateErrorBoundary>
  );
}

export default Zine;
