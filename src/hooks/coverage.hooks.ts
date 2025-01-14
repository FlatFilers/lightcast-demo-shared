import { recordHook } from "@flatfile/plugin-record-hook";
import { idcCodesArr } from "../blueprints/icdCodes";

export const coverageValidation = recordHook("coverage", async (record) => {
  const startDate = record.get("start_date") as string;
  const endDate = record.get("end_date") as string;

  if (startDate && !endDate) {
    console.log("startDate", startDate); 
    console.log("endDate", endDate);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 1, 0);
    const month = (endDateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = endDateObj.getDate().toString().padStart(2, '0');
    const year = endDateObj.getFullYear();
    record.set("end_date", `${month}/${day}/${year}`);
  }

  return record;
}); 