import FlatfileListener from "@flatfile/listener";
import { addStringValidator } from "./support/utils/common/validation";
import { diagnosisValidation } from "./hooks/diagnosis.hooks";
import { coverageValidation } from "./hooks/coverage.hooks";
import { spaceConfigure } from "./space.configure";
import { submitActionHandler } from "./jobs/submit.job";

export function aetion(listener: FlatfileListener) {
  // Add sheet validators
  listener.use(diagnosisValidation);
  listener.use(coverageValidation);

  // Add external validation
  listener.use(addStringValidator);

  // Add job handlers
  listener.use(submitActionHandler);

  // Configure the space
  listener.use(spaceConfigure);
} 