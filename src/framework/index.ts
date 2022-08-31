/* eslint-disable */
import { TemplateBundle } from "./Template";
import { Template } from "./Template";
import { RuleGenerator } from "./Template";
import { RuleFunction } from "./Template";
import { TemplateGenerator } from "./Template";
import { TemplateSetup } from "./Template";
import ZinePageConfig from "./configs/ZinePageConfig";
import { BasicTemplateProps } from "./configs/ZinePageConfig";
import InvalidTemplatePropsError from "./errors/InvalidTemplatePropsError";
import UndefinedSetupError from "./errors/UndefinedSetupError";
import EmptyZineError from "./errors/EmptyZineError";
import { PageFeatureController } from "./extensions-hooks/useAvailablePages";
import { imageCountCheck } from "./extensions-rules/imageCount";
import { minimumViewTimeCheck } from "./extensions-rules/minimumViewTime";
import { useAvailablePages } from "./extensions-hooks/useAvailablePages";
import { usePropValidator } from "./extensions-hooks/usePropValidator";
import { usePageTimer } from "./extensions-hooks/usePageTimer";
import { usePageRefs } from "./extensions-hooks/usePageRefs";
// FrameworkImportAnchor

// Core (manually updated)
export { TemplateBundle };
export { Template };
export type { RuleGenerator };
export type { RuleFunction };
export type { TemplateGenerator };
export type { TemplateSetup };
export { ZinePageConfig };
export type { BasicTemplateProps };
export { InvalidTemplatePropsError };
export { UndefinedSetupError };
export { EmptyZineError };
export type { PageFeatureController };

// Rules (Generator adds import/export)
export { imageCountCheck };
export { minimumViewTimeCheck };
// RuleExportAnchor

// Hooks (Generator adds import/export)
export { useAvailablePages };
export { usePropValidator };
export { usePageTimer };
export { usePageRefs };
// HookExportAnchor
