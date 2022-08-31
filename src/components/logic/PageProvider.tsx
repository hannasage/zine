import {
  createContext,
  FC,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import {
  EmptyZineError,
  PageFeatureController,
  useAvailablePages,
  usePageRefs,
  ZinePageConfig,
} from "../../framework";
import { PageRefController } from "../../framework/extensions-hooks/usePageRefs";

interface IPageContext extends PageFeatureController, PageRefController {}
// Create the default PageContext (empty)
const PageContext = createContext<IPageContext>({
  availablePages: [] as ZinePageConfig[],
  makeNextPageAvailable: () => {},
  sendRefToProvider: (_ref: MutableRefObject<any>, _index: number) => {},
  scrollToRef: (_index: number) => {},
} as IPageContext);

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

  const availablePagesHook = useAvailablePages(zine); // Page limiter
  const pageRefsHook = usePageRefs(); // Snap scroller

  return (
    <PageContext.Provider
      value={{
        ...availablePagesHook,
        ...pageRefsHook,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
/** Consume the PageProvider value and utilize the controllers for pages */
export const usePageContext = () => useContext(PageContext);

export default PageProvider;
