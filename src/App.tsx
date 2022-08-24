import React from "react";

import { TemplateErrorBoundary, PageProvider, Zine } from "./components";
import { ZinePageConfig } from "./framework";

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
