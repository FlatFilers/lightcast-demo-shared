import FlatfileListener from "@flatfile/listener";
import { lookupRoles } from "./jobs/lookup.job";
import { generateSkills } from "./jobs/populate.job";
import { filterSkills } from "./jobs/filter.job";
import { spaceConfigure } from "./space.configure";
import { submitActionHandler } from "./jobs/submit.job";
import { realTimeJobLookup } from "./hooks/lookup.hooks";
import { dedupePlugin } from "@flatfile/plugin-dedupe";

export default (listener: FlatfileListener) => {
  // Add hooks
  listener.use(realTimeJobLookup);

  // Add job handlers
  listener.use(lookupRoles);
  listener.use(generateSkills);
  listener.use(filterSkills);
  listener.use(submitActionHandler);

  // Add plugins
  listener.use(
    dedupePlugin("dedupe-roles", { on: "source_job_code", keep: "first" })
  );

  // Configure the space
  listener.use(spaceConfigure);
};
