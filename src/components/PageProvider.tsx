import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import {
  EmptyZineError,
  PageFeatureController,
  useAvailablePages,
  ZinePageConfig,
} from "../framework";

interface IPageContext extends PageFeatureController {}

const PageContext = createContext<IPageContext>({
  availablePages: [] as ZinePageConfig[],
  makeNextPageAvailable: () => {},
} as PageFeatureController);

const PageProvider: FC<PropsWithChildren<{ zine: ZinePageConfig[] }>> = ({
  zine,
  children,
}) => {
  // Throws if pages configuration is invalid
  useEffect(() => {
    if (zine.length === 0) throw new EmptyZineError();
  }, [zine]);
  const pagesHook = useAvailablePages(zine);
  return (
    <PageContext.Provider value={pagesHook}>{children}</PageContext.Provider>
  );
};
export const usePageContext = () => useContext(PageContext);

export default PageProvider;
