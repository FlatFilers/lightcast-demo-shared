import { configureSpace } from "@flatfile/plugin-space-configure";
import { roles } from "./blueprints/roles.sheet";
import { skills } from "./blueprints/skills.sheet";

export const spaceConfigure = configureSpace({
  workbooks: [
    {
      name: "Role Matching Workbook",
      sheets: [roles, skills],
      actions: [
        {
          operation: "pushToCustomerWorkbook",
          mode: "foreground",
          label: "Push to Customer",
          primary: true,
          description: "Takes mapped data and pushes to customer workbook",
        },
        {
          operation: "pullFromCustomerWorkbook",
          mode: "foreground",
          label: "Pull from Customer",
          primary: true,
          description:
            "Pulls all data from customer workbook and overwrites Lightcast Workbook",
        },
      ],
    },
    {
      name: "Customer Workbook",
      sheets: [
        {
          ...roles,
          allowAdditionalFields: false,
          access: ["edit", "delete"],
          fields: roles.fields.map((field) => ({
            ...field,
            readonly: !["approvedRole", "customer_comment"].includes(field.key),
          })),
        },
        {
          ...skills,
          allowAdditionalFields: false,
          access: ["edit", "delete"],
          fields: skills.fields.map((field) => ({
            ...field,
            readonly: !["reviewedSkill", "customer_comment"].includes(
              field.key
            ),
          })),
        },
      ],
      actions: [
        {
          operation: "submitActionFg",
          mode: "foreground",
          label: "Submit",
          primary: true,
          tooltip: "Submit data to HCM",
          inputForm: {
            type: "simple",
            fields: [
              {
                key: "account_id",
                label: "lightcast_account_id",
                type: "string",
              },
            ],
          },
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
          logo: "https://europe-insights.lightcast.io/static/media/Lighcast_RGB_Lockup_Color_full.050c98261a09f8c012ba.png",
        },
      },
    },
  },
});
