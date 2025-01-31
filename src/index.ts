import FlatfileListener from "@flatfile/listener";
import { lookupRoles } from "./jobs/lookup.job";
import { generateSkills } from "./jobs/populate.job";
import { filterSkills } from "./jobs/filter.job";
import { spaceConfigure } from "./space.configure";
import { submitActionHandler } from "./jobs/submit.job";
import { realTimeJobLookup } from "./hooks/lookup.hooks";
import { dedupePlugin } from "@flatfile/plugin-dedupe";
import { recordHook } from "@flatfile/plugin-record-hook";
import { pushToCustomerWorkbookHandler } from "./jobs/push.job";

export default (listener: FlatfileListener) => {
  // Configure the space
  listener.use(spaceConfigure);

  // Hooks that can likely be turned into a job
  listener.use(realTimeJobLookup);

  // Add job handlers
  listener.use(lookupRoles);
  listener.use(generateSkills);
  listener.use(filterSkills);
  listener.use(submitActionHandler);
  listener.use(pushToCustomerWorkbookHandler);
  //TODO: pull from customer workbook job: pullFromCustomerWorkbook
  //TODO: add automap plugin

  // Add plugins
  listener.use(
    dedupePlugin("dedupe-roles", { on: "source_job_code", keep: "first" })
  );

  // require comment when no role
  listener.use(
    recordHook("roles", (record, event) => {
      const roleCode = record.get("lightcast_code");
      const comment = record.get("customer_comment");

      if (!roleCode && !comment) {
        record.addError(
          ["lightcast_code", "customer_comment"],
          "Comments are required if no Lightcast Code and no Customer Comment"
        );
      }
      return record;
    })
  );
  // require comment when no skill
  listener.use(
    recordHook("skills", (record, event) => {
      const skillCode = record.get("skill_code");
      const comment = record.get("customer_comment");

      if (!skillCode && !comment) {
        record.addError(
          ["skill_code", "customer_comment"],
          "Comments are required if no Lightcast Skill Code and no Customer Comment"
        );
      }
      return record;
    })
  );
};
