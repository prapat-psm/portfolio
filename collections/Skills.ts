import { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Skill Name',
      admin: {
        description: 'ชื่อของเทคโนโลยีหรือสกิล (เช่น React, Node.js, TypeScript)',
      },
    },
  ],
}
