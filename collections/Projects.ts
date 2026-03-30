import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title', // แสดงชื่อโปรเจคในหน้ารายการ
  },
  access: {
    read: () => true, // อนุญาตให้ทุกคนอ่านข้อมูลได้
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (เช่น my-awesome-project)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
      admin: {
        description: 'รูปภาพหน้าปกโปรเจค',
      },
    },
    {
      name: 'techStack',
      type: 'array',
      label: 'Technology Stack (Badges)',
      admin: {
        description: 'เพิ่มรายชื่อเครื่องมือและเทคโนโลยีที่ใช้ (เช่น React, Next.js, Tailwind CSS)',
      },
      fields: [
        {
          name: 'techName',
          type: 'text',
          required: true,
          label: 'Technology Name',
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      admin: {
        description: 'คำอธิบายสั้นๆ สำหรับแสดงบนหน้า Card ของโปรเจค',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Project Details / Content',
      admin: {
        description: 'รายละเอียดเนื้อหาของโปรเจค สามารถแทรกรูปภาพ อธิบายระบบ หรือความท้าทายได้',
      },
    },
    // ---- ส่วนที่แนะนำเพิ่มเติม ----
    {
      name: 'links',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'websiteUrl',
          type: 'text',
          label: 'Live Website URL',
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub URL',
        },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'เลือกเพื่อให้แสดงเป็นโปรเจคแนะนำในหน้าแรก',
      },
    },
    {
      name: 'completionDate',
      type: 'date',
      label: 'Completion Date / Year',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'yyyy-MM',
        },
      },
    },
  ],
}
