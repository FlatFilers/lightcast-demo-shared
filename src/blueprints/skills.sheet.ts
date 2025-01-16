import { Flatfile } from "@flatfile/api";

/**
 * @FlatfileConstraints
 */
export const skills: Flatfile.SheetConfig = {
  name: "Skills",
  slug: "skills",
  readonly: false,
  allowAdditionalFields: false,
  fields: [
    {
      key: "reviewedSkill",
      type: "boolean",
      label: "Approved?",
      constraints: [
      ],
    },
    {
      key: "source_job_code",
      type: "reference",
      label: "Source Job Code",
      config: {
        ref: 'roles',
        key: 'source_job_code',
        relationship: 'has-one',
      },
      constraints: [
      ],
      readonly: true,
    },
    {
      key: "source_job_family",
      type: "reference",
      label: "Source Job Family",
      config: {
        ref: 'roles',
        key: 'source_job_family',
        relationship: 'has-one',
      },
      readonly: true,
      // constraints: [
      //   {
      //     type: "stored",
      //     validator: "flatfileIsValidDateRange",
      //     config: {},
      //   },
      // ],
    },
    {
      key: "source_job_title",
      type: "reference",
      label: "Source Job Title",
      config: {
        ref: 'roles',
        key: 'source_job_title',
        relationship: 'has-one',
      },
      readonly: true,
      // constraints: [
      //   {
      //     type: "stored",
      //     validator: "flatfileIsValidDateRange",
      //     config: {},
      //   },
      // ],
    },
    {
      key: "source_job_description",
      type: "reference",
      label: "Source Job Description",
      config: {
        ref: 'roles',
        key: 'source_job_description',
        relationship: 'has-one',
      },
      constraints: [
      ],
      readonly: true,
    },
    {
      key: "skill_code",
      type: "string",
      label: "Lightcast Skill Code",
      constraints: [
      ],
      readonly: true,
    },
    {
      key: "skill_name",
      type: "string",
      label: "Lightcast Skill Name",
      constraints: [
      ],
      readonly: true,
    },
    //standard enum list I can pull from?
    {
      key: "skill_category",
      type: "enum",
      label: "Lightcast Skill Category",
      config: {
        options: [
          { value: "Sales" },
          { value: "Planning" },
          { value: "Operations" },
          { value: "Strategy" },
          { value: "Personal" },
        ]
      },
      constraints: [
      ],
      readonly: true,
    },
    {
      key: "skill_description",
      type: "string",
      label: "Lightcast Skill Category",
      constraints: [
      ],
      readonly: true,
    },
    {
      key: "lightcast_code",
      type: "reference",
      label: "Lightcast Role Code",
      config: {
        ref: 'roles',
        key: 'lightcast_code',
        relationship: 'has-one',
      },
      constraints: [
      ],
      readonly: true,
    },
    {
      key: "lightcast_role_name",
      type: "reference",
      label: "Lightcast Role Name",
      config: {
        ref: 'roles',
        key: 'lightcast_role_name',
        relationship: 'has-one',
      },
      constraints: [
      ],
      readonly: true,
    },
    {
      key: "lightcast_role_description",
      type: "reference",
      label: "Lightcast Role Description",
      config: {
        ref: 'roles',
        key: 'lightcast_role_description',
        relationship: 'has-one',
      },
      constraints: [
      ],
      readonly: true,
    },
  ],
  actions: [
    {
      operation: "lookupSkillTableFg",
      mode: "foreground",
      label: "Lookup Skills By Role",
      primary: true,
      description: "Filter the skills table by a specific job code",
    },
  ]
};
