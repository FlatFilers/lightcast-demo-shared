import { recordHook } from "@flatfile/plugin-record-hook";
// mocked API call
import { roleTable } from "../blueprints/jobs-database";

export const realTimeJobLookup = recordHook("roles", async (r) => {
  const sourceCode = r.get("source_job_code") as string;
  const sourceTitle = r.get("source_job_title") as string;

  // Check for exact match in jobCode
  const jobCodeMatch = roleTable.find((role) => role.jobCode === sourceCode);

  // Check for exact match in jobTitle
  const jobTitleMatch = roleTable.find((role) => role.jobTitle === sourceTitle);

  let jobMatch: any = null;
  if (jobCodeMatch) {
    jobMatch = jobCodeMatch;
  } else if (jobTitleMatch) {
    jobMatch = jobTitleMatch;
  }

  if (jobMatch) {
    // Map the values from the roleTable to the record object
    r.set("lightcast_code", jobMatch.jobCode);
    r.set("lightcast_role_name", jobMatch.jobTitle);
    r.set("lightcast_role_description", jobMatch.jobDescription);
    r.set("lightcast_role_category", jobMatch.jobCategory);
  }

  return r;
}); 