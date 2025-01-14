import { Flatfile } from "@flatfile/api";

/**
 * @FlatfileConstraints
 */
export const coverageSheet: Flatfile.SheetConfig = {
  name: "Coverage",
  slug: "coverage",
  readonly: false,
  allowAdditionalFields: false,
  fields: [
    {
      key: "patient_id",
      type: "reference",
      label: "patient_id",
      config: {
        ref: "patient",
        key: "patient_id",
        relationship: "has-one",
      },
    },
    {
      key: "coverage_id",
      type: "string",
      label: "coverage_id",
    },
    {
      key: "coverage_subtype",
      type: "string",
      label: "coverage_subtype",
    },
    {
      key: "coverage_type",
      type: "enum",
      label: "coverage_type",
      config: {
        options: [
          {
            value: "CDHP",
            label: "CDHP",
          },
          {
            value: "COMP",
            label: "COMP",
          },
          {
            value: "Cap or Part Cap POS",
            label: "Cap or Part Cap POS",
          },
          {
            value: "EPO",
            label: "EPO",
          },
          {
            value: "HDHP",
            label: "HDHP",
          },
          {
            value: "HMO",
            label: "HMO",
          },
          {
            value: "Non-Cap POS",
            label: "Non-Cap POS",
          },
          {
            value: "PPO",
            label: "PPO",
          },
          {
            value: "HSA",
            label: "HSA",
          },
          {
            value: "Indemnity/Traditional",
            label: "Indemnity/Traditional",
          },
          {
            value: "POS",
            label: "POS",
          },
          {
            value: "Unk",
            label: "Unk",
          },
        ],
      },
    },
    {
      key: "start_date",
      type: "date",
      label: "start_date",
      constraints: [
        {
          type: "stored",
          validator: "flatfileIsValidDateRange",
          config: {},
        },
      ],
    },
    {
      key: "end_date",
      type: "date",
      label: "end_date",
      constraints: [
        {
          type: "stored",
          validator: "flatfileIsValidDateRange",
          config: {},
        },
      ],
    },
    {
      key: "family_id",
      type: "string",
      label: "family_id",
    },
    {
      key: "group_id",
      type: "string",
      label: "group_id",
    },
    {
      key: "group_name",
      type: "string",
      label: "group_name",
    },
    {
      key: "insurance_plan_type",
      type: "enum",
      label: "insurance_plan_type",
      config: {
        options: [
          {
            value: "Med",
            label: "Med",
          },
          {
            value: "Med + Rx",
            label: "Med + Rx",
          },
          {
            value: "Rx",
            label: "Rx",
          },
        ],
      },
    },
    {
      key: "payer_type",
      type: "enum",
      label: "payer_type",
      config: {
        options: [
          {
            value: "medicare",
            label: "medicare",
          },
          {
            value: "medicaid",
            label: "medicaid",
          },
          {
            value: "commercial",
            label: "commercial",
          },
        ],
      },
    },
    {
      key: "census_division",
      type: "enum",
      label: "census_division",
      config: {
        options: [
          {
            value: "Northeast",
            label: "Northeast",
          },
          {
            value: "Midwest",
            label: "Midwest",
          },
          {
            value: "South",
            label: "South",
          },
          {
            value: "West",
            label: "West",
          },
          {
            value: "Unknown",
            label: "Unknown",
          },
          {
            value: "East",
            label: "East",
          },
        ],
      },
    },
    {
      key: "region_1",
      type: "string",
      label: "region_1",
    },
    {
      key: "region_2",
      type: "string",
      label: "region_2",
    },
    {
      key: "subscriber_relationship",
      type: "enum",
      label: "subscriber_relationship",
      config: {
        options: [
          {
            value: "Child/Other",
            label: "Child/Other",
          },
          {
            value: "Employee",
            label: "Employee",
          },
          {
            value: "Spouse",
            label: "Spouse",
          },
          {
            value: "Father",
            label: "Father",
          },
          {
            value: "Grandfather or Grandmother",
            label: "Grandfather or Grandmother",
          },
          {
            value: "Grandson or Grandaughter",
            label: "Grandson or Grandaughter",
          },
          {
            value: "Mother",
            label: "Mother",
          },
          {
            value: "Self",
            label: "Self",
          },
          {
            value: "Unknown",
            label: "Unknown",
          },
          {
            value: "Dependent",
            label: "Dependent",
          },
        ],
      },
    },
  ],
};
