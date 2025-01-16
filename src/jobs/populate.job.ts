import api from "@flatfile/api";
import { jobHandler } from "@flatfile/plugin-job-handler";
import { FlatfileListener } from "@flatfile/listener";
import { roleTable } from "../blueprints/jobs-database";
import { RecordData } from "@flatfile/api/api";

export const generateSkills = (listener: FlatfileListener) => {
  listener.use(
    jobHandler("sheet:generateSkillTableBg", async (event, tick) => {
      const { jobId, workbookId, sheetId } = event.context;

      try {
        await tick(10, "Getting approved roles");

        const rolesResponse = await api.records.get(sheetId);
        const approvedRoles = rolesResponse.data.records.filter(
          record => record.values.approvedRole?.value === true
        );

        const sheets = await api.sheets.list({ workbookId });
        const skillsSheet = sheets.data.find(sheet => sheet.slug === "skills");

        if (!skillsSheet) {
          throw new Error("Skills sheet not found");
        }

        let skillsToCreate: RecordData[] = [];

        for (const role of approvedRoles) {
          const lightcastCode = role.values.lightcast_code?.value;
          const roleMatch = roleTable.find(r => r.jobCode === lightcastCode);

          if (roleMatch && roleMatch.jobSkills) {
            roleMatch.jobSkills.forEach(skill => {
              skillsToCreate.push({
                reviewedSkill: { value: false },
                source_job_code: { value: role.values.source_job_code?.value },
                source_job_family: { value: role.values.source_job_family?.value },
                source_job_title: { value: role.values.source_job_title?.value },
                source_job_description: { value: role.values.source_job_description?.value },
                skill_code: { value: skill.skillCode },
                skill_name: { value: skill.skillName },
                skill_category: { value: skill.skillCategory },
                skill_description: { value: "" },
                lightcast_code: { value: lightcastCode },
                lightcast_role_name: { value: role.values.lightcast_role_name?.value },
                lightcast_role_description: { value: role.values.lightcast_role_description?.value }
              });
            });
          }
        }

        console.log("First record to insert:", skillsToCreate[0]);

        if (skillsToCreate.length > 0) {
          const insertResult = await api.records.insert(skillsSheet.id,
            skillsToCreate);
          console.log("Insert result:", insertResult);
        }

        await tick(100, `Successfully created ${skillsToCreate.length} skill records`);

      } catch (error) {
        console.error("Error generating skills:", error);
        throw error;
      }
    })
  );
};