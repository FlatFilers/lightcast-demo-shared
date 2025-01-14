import { recordHook } from "@flatfile/plugin-record-hook";
import { idcCodesArr } from "../blueprints/icdCodes";

export const diagnosisValidation = recordHook("diagnosis", async (record) => {
  const icdCode = record.get("diagnosis_code") as string;
  const icdCodeExists = idcCodesArr.includes(icdCode);

  if (!icdCodeExists && icdCode !== "" && icdCode !== null) {
    record.addError("diagnosis_code", "Diagnosis code is not valid");
  }

  return record;
}); 