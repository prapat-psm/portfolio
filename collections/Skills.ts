import { CACHE_TAGS } from '@/libs/cache-tags'
import { revalidateCollection } from '@/libs/revalidate'
import { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  hooks: revalidateCollection(Object.values(CACHE_TAGS)),
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
    // Join fields are virtual (no DB column): they show the reverse side of each
    // relationship, so you can see where a skill is used before editing or deleting it.
    {
      name: 'usedInProjects',
      type: 'join',
      collection: 'projects',
      on: 'techStack',
      label: 'Used in Projects',
      admin: { allowCreate: false, defaultColumns: ['title'] },
    },
    {
      name: 'usedInStacks',
      type: 'join',
      collection: 'stacks',
      on: 'skills',
      label: 'Used in Stacks',
      admin: { allowCreate: false, defaultColumns: ['title'] },
    },
    {
      name: 'usedInWorkExperiences',
      type: 'join',
      collection: 'work-experiences',
      on: 'skills',
      label: 'Used in Work Experiences',
      admin: { allowCreate: false, defaultColumns: ['companyName', 'role'] },
    },
  ],
}
