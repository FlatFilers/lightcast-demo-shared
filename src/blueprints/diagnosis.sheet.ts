import { Flatfile } from "@flatfile/api";

/**
 * @FlatfileConstraints
 */
export const diagnosisSheet: Flatfile.SheetConfig = {
  name: "Diagnosis",
  slug: "diagnosis",
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
      key: "service_id",
      type: "string",
      label: "Service ID",
    },
    {
      key: "service_type", 
      type: "enum",
      label: "Service Type",
      config: {
        options: [
          {
            label: "Medical Claim",
            value: "medical_claim",
          },
          {
            label: "Pharmacy Claim", 
            value: "pharmacy_claim",
          },
          {
            label: "Hospital Admission",
            value: "hospital_admission", 
          },
          {
            label: "Lab Result",
            value: "lab_result",
          },
          {
            label: "Material DME",
            value: "material_dme",
          },
          {
            label: "Discharge Summary JP",
            value: "discharge_summary_jp",
          },
        ],
      },
    },
    {
      key: "diagnosis_code_index",
      type: "string",
      label: "Diagnosis Code Index",
    },
    {
      key: "admitting_diagnosis_flag",
      type: "boolean",
      label: "Admitting Diagnosis Flag",
    },
    {
      key: "diagnosis_coding_system",
      type: "enum",
      label: "Diagnosis Coding System",
      config: {
        options: [
          {
            label: "ICD-9-CM",
            value: "ICD-9-CM",
          },
          {
            label: "ICD-10-CM", 
            value: "ICD-10-CM",
          },
        ],
      },
    },
    {
      key: "diagnosis_code",
      type: "string",
      label: "Diagnosis Code",
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
      key: "native_diagnosis_code",
      type: "string",
      label: "Native Diagnosis Code",
    },
    {
      key: "native_diagnosis_name",
      type: "string",
      label: "Native Diagnosis Name",
    },
    {
      key: "poa",
      type: "enum",
      label: "POA",
      config: {
        options: [
          {
            label: "Yes, present on admission",
            value: "Yes, present on admission",
          },
          {
            label: "Clinically Undetermined", 
            value: "Clinically Undetermined",
          },
          {
            label: "Missing/Unknown",
            value: "Missing/Unknown",
          },
          {
            label: "No, not present at admission",
            value: "No, not present at admission",
          },
          {
            label: "Unknown",
            value: "Unknown",
          },
          {
            label: "Unreported/Not Used",
            value: "Unreported/Not Used",
          },
        ],
      },
    },
    {
      key: "diagnosis_type",
      type: "enum",
      label: "Diagnosis Type",
      config: {
        options: [
          {
            label: "Diag-Principal",
            value: "diag-principal",
          },
          {
            label: "Diag-Primary", 
            value: "diag-primary",
          },
          {
            label: "Diag-Secondary",
            value: "diag-secondary",
          },
          {
            label: "Diag-Other",
            value: "diag-other",
          },
        ],
      },
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
      key: "suspected_diagnosis_flag",
      type: "boolean",
      label: "Suspected Diagnosis Flag",
    },
  ],
};
