import { Flatfile } from "@flatfile/api";

/**
 * @FlatfileConstraints
 */
export const patientSheet: Flatfile.SheetConfig = {
  name: "Patient",
  slug: "patient",
  readonly: false,
  allowAdditionalFields: false,
  fields: [
    {
      key: "patient_id",
      type: "string",
      label: "patient_id",
      constraints: [
      ],
    },
    {
      key: "birth_date",
      type: "date",
      label: "birth_date",
      constraints: [
        {
          type: "stored",
          validator: "flatfileIsValidDateRange",
          config: {},
        },
      ],
    },
    {
      key: "deceased_date",
      type: "date",
      label: "deceased_date",
      constraints: [
        {
          type: "stored",
          validator: "flatfileIsValidDateRange",
          config: {},
        },
      ],
    },
    {
      key: "ethnicity",
      type: "string",
      label: "ethnicity",
      constraints: [
      ],
    },
    {
      key: "gender",
      type: "enum",
      label: "gender",
      constraints: [
      ],
      config: {
        options: [
          {
            value: "Male",
            label: "Male",
          },
          {
            value: "Female",
            label: "Female",
          },
        ],
      },
    },
    {
      key: "race",
      type: "string",
      label: "race",
      constraints: [
      ],
    },
  ],
};
