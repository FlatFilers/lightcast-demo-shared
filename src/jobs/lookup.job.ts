import api, { Flatfile } from "@flatfile/api";
import { jobHandler } from "@flatfile/plugin-job-handler";
import { FlatfileListener } from "@flatfile/listener";
import { roleTable } from "../blueprints/jobs-database";

export const lookupRoles = (listener: FlatfileListener) => {
  listener.use(
    jobHandler("sheet:lookupRolesFg", async (event, tick) => {
      const { jobId, sheetId } = event.context;
      await tick(10, "Establishing connection to API");

      try {
        const records = (await api.records.get(sheetId)).data.records.map(toSimpleRecord)
        let updates: SimpleRecord[] = []; // Initialize as empty array
        let updatesCount = 0;

        for (const record of records) {
          // Check for exact match in jobCode
          const jobCodeMatch = roleTable.find((role) => role.jobCode === record.source_job_code);

          // Check for exact match in jobTitle
          const jobTitleMatch = roleTable.find((role) => role.jobTitle === record.source_job_title);

          let jobMatch: any = null;
          if (jobCodeMatch) {
            jobMatch = jobCodeMatch;
          } else if (jobTitleMatch) {
            jobMatch = jobTitleMatch;
          }

          if (jobMatch) {
            // Map the values from the roleTable to the record object
            record.lightcast_code = jobMatch.jobCode;
            record.lightcast_role_name = jobMatch.jobTitle;
            record.lightcast_role_description = jobMatch.jobDescription;
            record.lightcast_role_category = jobMatch.jobCategory;
            updates.push(record); // Use push instead of spread
          }
        }

        const payload = updates.map(record => {
          const values = Object.entries(record)
            .filter(([key]) => key !== 'id')
            .reduce((acc, [key, value]) => ({
              ...acc,
              [key]: { value }
            }), {});

          return {
            id: record.id as any,
            values
          };
        });
        await api.records.update(sheetId, payload)
        console.log(JSON.stringify(payload, null, 2))
      }
      catch (error: any) {
        console.error("Error running lookup action:", error);
      }
    })
  )
}

export function toSimpleRecord(r: Flatfile.Record_ | Flatfile.RecordWithLinks): SimpleRecord {
  const obj = Object.fromEntries(Object.entries(r.values).map(([key, value]) => [key, value.value] as [string, any]))
  obj.id = r.id
  return obj as SimpleRecord
}
export type Primitive = string | number | null | boolean
export type SimpleRecord = Record<string, Primitive>

