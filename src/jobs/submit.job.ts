import api from "@flatfile/api";
import { jobHandler } from "@flatfile/plugin-job-handler";
import { FlatfileListener } from "@flatfile/listener";

export const submitActionHandler = (listener: FlatfileListener) => {
  listener.use(
    jobHandler("workbook:submitActionFg", async (event, tick) => {
      const { jobId, workbookId } = event.context;
      
      try {
        // Acknowledge the job start
        await tick(10, "Starting to process customer information");

        // Get all sheets from the workbook
        const { data: sheets } = await api.sheets.list({ workbookId });
        
        await tick(30, "Retrieved sheets, collecting records");

        // Collect all records from each sheet
        let totalRecords = 0;
        const records: { [name: string]: any } = {};
        for (const [index, sheet] of sheets.entries()) {
          const { data: sheetRecords } = await api.records.get(sheet.id);
          records[`Sheet[${index}]`] = sheetRecords;
          totalRecords += (sheetRecords.records || []).length;
          
          await tick(
            30 + ((index + 1) / sheets.length) * 40,
            `Processed records from sheet ${index + 1} of ${sheets.length}`
          );
        }

        // Here you would typically send the data to your API
        // For demo purposes, we'll just log the records
        console.log("Records ready for submission:", JSON.stringify(records));

        await tick(90, "Processing complete");

        // Complete the job
        await api.jobs.complete(jobId, {
          outcome: {
            message: `Successfully processed ${totalRecords} records`
          }
        });
      } catch (error: any) {
        console.error("Error processing submit action:", error);
        
        await api.jobs.fail(jobId, {
          outcome: {
            message: `Error processing records: ${error.message}`
          }
        });
      }
    })
  );
}; 