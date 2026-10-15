import { CACHE_TAGS } from '@/libs/cache-tags'
import { revalidateCollection } from '@/libs/revalidate'
import { CollectionConfig } from 'payload'
import { preventDeleteIfReferenced } from './hooks/preventDeleteIfReferenced'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  hooks: {
    ...revalidateCollection([CACHE_TAGS.projects, CACHE_TAGS.profile]),
    beforeDelete: [
      preventDeleteIfReferenced([
        { collection: 'projects', field: 'featuredImage', label: 'project(s) as cover image' },
        { global: 'profile', field: 'resume', label: 'Profile as resume' },
      ]),
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
