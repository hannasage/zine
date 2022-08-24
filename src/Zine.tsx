import React from "react";

import TemplateErrorBoundary from "./components/TemplateErrorBoundary";
import { ZinePage } from "./components/ZinePage";
import PageProvider, { usePageContext } from "./components/PageProvider";
import { ZinePageConfig } from "./framework";

/** Controls the render flow of pages. */
function Zine() {
  const { availablePages } = usePageContext();
  return (
    <>
      {availablePages &&
        availablePages.map((config, idx) => (
          <ZinePage key={`${idx}-${config.templateId}`} {...config} />
        ))}
    </>
  );
}

function App({ zine }: { zine: ZinePageConfig[] }) {
  return (
    <TemplateErrorBoundary>
      <PageProvider zine={zine}>
        <Zine />
      </PageProvider>
    </TemplateErrorBoundary>
  );
}

export default App;
