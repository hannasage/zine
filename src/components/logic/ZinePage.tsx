import { useEffect, useMemo, useRef } from "react";

import ZinePageConfig from "../../framework/configs/ZinePageConfig";
import {
  Template,
  usePageControls,
  usePageTimer,
  usePropValidator,
} from "../../framework";

import { usePageContext } from "./PageProvider";

interface ZinePageProps {
  config: ZinePageConfig;
  index: number;
}
/** Controls the template generation, rendering, and timing of a page. */
export const ZinePage = ({ config, index }: ZinePageProps) => {
  // Use arrow keys for controller
  usePageControls(index);
  // Access global features
  const { sendRefToProvider } = usePageContext();
  // Make ref for page
  const pageRef = useRef(null);
  useEffect(() => {
    sendRefToProvider(pageRef, index);
  }, []); // eslint-disable-line
  // Throws if ZinePageConfig.templateId returns no TemplateBundle
  const template = useMemo(() => new Template(config, pageRef), [config]);
  // Throws if any props are invalid for the desired template
  usePropValidator(template);
  // Handles releasing the next page
  usePageTimer(config.viewTimeRequirement);
  // Hydrate and render the component now that everything is valid
  return template.hydrate();
};
