import api from "@flatfile/api";
import { jobHandler } from "@flatfile/plugin-job-handler";
import { FlatfileListener } from "@flatfile/listener";

export const filterSkills = (listener: FlatfileListener) => {
  listener.use(
    jobHandler("sheet:lookupSkillTableFg", async (event, tick) => {
      // action with input that includes all of the values from roles.source_job_code
      // when the user selects a code, apply a filter to the table
    })
  );
}; 