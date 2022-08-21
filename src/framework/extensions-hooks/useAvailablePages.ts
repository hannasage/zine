import { useState } from "react";

import { ZinePageConfig } from "../configs";

export const useAvailablePages = (pages: ZinePageConfig[]) => {
  const [available, setAvailable] = useState<ZinePageConfig[]>(pages);
  return available;
};
