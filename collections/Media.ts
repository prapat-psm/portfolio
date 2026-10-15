import { CACHE_TAGS } from '@/libs/cache-tags'
import { revalidateCollection } from '@/libs/revalidate'
import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  hooks: revalidateCollection([CACHE_TAGS.projects]),
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
