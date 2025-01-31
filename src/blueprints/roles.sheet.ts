import { Flatfile } from "@flatfile/api";

/**
 * @FlatfileConstraints
 */
export const roles: Flatfile.SheetConfig = {
  name: "Roles",
  slug: "roles",
  readonly: false,
  allowAdditionalFields: false,
  fields: [
    {
      key: "approvedRole",
      type: "boolean",
      label: "Approved?",
      constraints: [],
    },
    {
      key: "source_job_code",
      type: "string",
      label: "Source Job Code",
      constraints: [{ type: "unique" }, { type: "required" }],
    },
    {
      key: "source_job_family",
      type: "string",
      label: "Source Job Family",
    },
    {
      key: "source_job_title",
      type: "string",
      label: "Source Job Title",
    },
    {
      key: "source_job_description",
      type: "string",
      label: "Source Job Description",
      constraints: [],
    },
    {
      key: "lightcast_code",
      type: "string",
      label: "Lightcast Role Code",
      constraints: [],
    },
    {
      key: "lightcast_role_name",
      type: "string",
      label: "Lightcast Role Name",
      constraints: [],
    },
    {
      key: "lightcast_role_description",
      type: "string",
      label: "Lightcast Role Description",
      constraints: [],
    },
    {
      key: "lightcast_role_category",
      type: "string",
      label: "Lightcast Role Category",
      constraints: [],
    },
    {
      key: "customer_comment",
      type: "string",
      label: "Customer Comment",
      constraints: [],
    },
    {
      key: "lightcast_match_confidence",
      type: "number",
      label: "Lightcast Match Confidence",
      constraints: [],
    },
  ],
  actions: [
    {
      operation: "lookupRolesFg",
      mode: "foreground",
      label: "Look Up Roles",
      primary: true,
      description: "Searching for matching Lightcast Role(s)",
    },
    {
      operation: "generateSkillTableBg",
      mode: "background",
      label: "Populate Skill Table",
      primary: true,
      description: "Populating skill table for confirmed roles.",
    },
    {
      operation: "dedupe-roles",
      mode: "background",
      label: "Dedupe roles by source code",
      description: "Remove duplicate source roles",
    },
  ],
};
