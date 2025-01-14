import { configureSpace } from "@flatfile/plugin-space-configure";
import { patientSheet } from "./blueprints/patient.sheet";
import { coverageSheet } from "./blueprints/coverage.sheet";
import { encountersSheet } from "./blueprints/encounters.sheet";
import { diagnosisSheet } from "./blueprints/diagnosis.sheet";

export const spaceConfigure = configureSpace({
  workbooks: [
    {
      name: "Aetion Workbook",
      sheets: [patientSheet, coverageSheet, diagnosisSheet],
      actions: [
        {
          operation: "submitActionFg",
          mode: "foreground",
          label: "Submit",
          primary: true,
          description: "Submit data for processing",
        },
      ],
    },
  ],
  space: {
    metadata: {
      theme: {
        root: {
          primaryColor: "#000000",
        },
        sidebar: {
          logo: "https://aetion.com/wp-content/uploads/2020/09/Aetion-H-logo.svg",
          backgroundColor: "#ffffff",
          focusTextColor: "#ffffff",
          focusBgColor: "#000000",
          titleColor: "#000000",
          textColor: "#000000"
        },
      },
    },
  },
})