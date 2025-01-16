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
          operation: "submitActionFg",
          mode: "foreground",
          label: "Submit",
          primary: true,
          description: "Submit data to HCM",
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
          // backgroundColor: "#ffffff",
          // focusTextColor: "#ffffff",
          // focusBgColor: "#000000",
          // titleColor: "#000000",
          // textColor: "#000000"
        },
      },
    },
  },
})