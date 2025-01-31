import api from "@flatfile/api";
import { jobHandler } from "@flatfile/plugin-job-handler";
import { FlatfileListener } from "@flatfile/listener";

export const pushToCustomerWorkbookHandler = (listener: FlatfileListener) => {
  listener.use(
    jobHandler("workbook:pushToCustomerWorkbook", async (event, tick) => {
      const { jobId, workbookId } = event.context;

      try {
        // Check confirmation from input form
        const job = await api.jobs.get(jobId);
        const confirmOverwrite = job.data.input?.confirmOverwrite;

        if (!confirmOverwrite) {
          throw new Error("User did not confirm the overwrite operation");
        }

        await tick(10, "Starting to push data to Customer Workbook");

        // Rest of the implementation remains the same...
        const workbook = await api.workbooks.get(workbookId);
        const spaceId = workbook.data.spaceId;

        const { data: workbooks } = await api.workbooks.list({ spaceId });
        const customerWorkbook = workbooks.find(
          (wb) => wb.name === "Customer Workbook"
        );

        if (!customerWorkbook) {
          throw new Error("Customer Workbook not found in space");
        }

        await tick(20, "Found Customer Workbook, retrieving source data");

        // Get sheets from source workbook
        const { data: sourceSheets } = await api.sheets.list({ workbookId });
        const { data: targetSheets } = await api.sheets.list({
          workbookId: customerWorkbook.id,
        });

        // Process each sheet
        for (const [index, sourceSheet] of sourceSheets.entries()) {
          await tick(30 + index * 30, `Processing ${sourceSheet.name} sheet`);

          // Find matching target sheet
          const targetSheet = targetSheets.find(
            (s) => s.slug === sourceSheet.slug
          );

          if (!targetSheet) {
            throw new Error(`Matching sheet not found for ${sourceSheet.name}`);
          }

          // Get records from source sheet
          const { data: sourceRecords } = await api.records.get(sourceSheet.id);

          // WIP: Delete existing records in target sheet
          // await api.records.delete(targetSheet.id, {});

          // WIP: Insert new records into target sheet
          // if (sourceRecords.records && sourceRecords.records.length > 0) {
          //   await api.records.insert(targetSheet.id, {
          //     records: sourceRecords.records,
          //   });
          // }

          await tick(
            50 + index * 30,
            `Completed transfer for ${sourceSheet.name}`
          );
        }
      } catch (error: any) {
        console.error("Error pushing to Customer Workbook:", error);

        await api.jobs.fail(jobId, {
          outcome: {
            message: `Failed to push data: ${error.message}`,
          },
        });
      }
    })
  );
};
