import { Flatfile } from "@flatfile/api";

/**
 * @FlatfileConstraints
 */
export const encountersSheet: Flatfile.SheetConfig = {
  name: "Encounters",
  slug: "encounters",
  readonly: false,
  allowAdditionalFields: false,
  fields: [
    {
      key: "patient_id",
      type: "string",
      label: "Patient ID",
      constraints: [
      ],
    },
    {
      key: "service_id",
      type: "string",
      label: "Service ID",
      description: "created by ingestion",
      constraints: [
      ],
    },
    {
      key: "service_type",
      type: "string",
      label: "Service Type",
      description: "created by ingestion",
      constraints: [
      ],
    },
    {
      key: "start_date",
      type: "date",
      label: "Start Date",
      constraints: [
        {
          type: "stored",
          validator: "flatfileIsValidDateRange",
          config: {},
        },
      ],
    },
    {
      key: "encounter_type",
      type: "enum",
      label: "Encounter Type",
      constraints: [
      ],
      config: {
        options: [
          {
            value: "office visit",
            label: "Office Visit",
          },
          {
            value: "lab visit",
            label: "Lab Visit",
          },
          {
            value: "etc",
            label: "Etc",
          },
        ],
      },
    },
    {
      key: "end_date",
      type: "date",
      label: "End Date",
      constraints: [
        {
          type: "stored",
          validator: "flatfileIsValidDateRange",
          config: {},
        },
      ],
    },
    {
      key: "discharge_status",
      type: "string",
      label: "Discharge Status",
      constraints: [
      ],
    },
    {
      key: "admit_type",
      type: "string",
      label: "Admit Type",
      constraints: [
      ],
    },
    {
      key: "drg",
      type: "string",
      label: "DRG",
      constraints: [
      ],
    },
    {
      key: "emergency_flag",
      type: "boolean",
      label: "Emergency Flag",
      constraints: [
        {
          type: "stored",
          validator: "flatfileMapsToBoolean",
          config: {},
        },
      ],
    },
    {
      key: "inpatient_flag",
      type: "string",
      label: "Inpatient Flag",
      constraints: [
      ],
    },
    {
      key: "source",
      type: "string",
      label: "Source",
      constraints: [
      ],
    },
    {
      key: "practitioner_id",
      type: "string",
      label: "Practitioner ID",
      constraints: [
      ],
    },
    {
      key: "facility_id",
      type: "string",
      label: "Facility ID",
      constraints: [
      ],
    },
  ],
};
