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
// Create the default PageContext (empty)
const PageContext = createContext<IPageContext>({
  availablePages: [] as ZinePageConfig[],
  makeNextPageAvailable: () => {},
} as PageFeatureController);

/** Wrap the app in this and provide the useAvailablePages functionality to every
 * component. */
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
/** Consume the PageProvider value and utilize the controllers for pages */
export const usePageContext = () => useContext(PageContext);

export default PageProvider;
