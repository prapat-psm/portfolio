import { CollectionConfig } from 'payload'

export const WorkExperiences: CollectionConfig = {
  slug: 'work-experiences',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'role', 'yearStart', 'isCurrent'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      label: 'Company Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Job Role / Title',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'yearStart',
          type: 'date',
          required: true,
          label: 'Start Date',
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'yyyy/MM',
            },
          },
        },
        {
          name: 'yearEnd',
          type: 'date',
          label: 'End Date',
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'yyyy/MM',
            },
            condition: (data) => !data.isCurrent,
          },
        },
        {
          name: 'isCurrent',
          type: 'checkbox',
          label: 'Currently Working Here',
          defaultValue: false,
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description / Achievements',
      required: true,
      admin: {
        description: 'Describe your role and key achievements (Top-tier resume style)',
      },
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      label: 'Skills Used',
      admin: {
        description: 'Select skills related to this work experience',
      },
    },
  ],
}
