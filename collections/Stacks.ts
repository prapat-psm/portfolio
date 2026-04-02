import { CollectionConfig } from 'payload'

export const Stacks: CollectionConfig = {
  slug: 'stacks',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Title',
      admin: {
        description: 'ชื่อกลุ่มของสกิล (เช่น Core Tech, Full-stack Engineering)',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: 'Category Icon',
      options: [
        { label: 'Bracket', value: 'bracket' },
        { label: 'Database', value: 'database' },
        { label: 'Terminal', value: 'terminal' },
        { label: 'Blocks', value: 'blocks' },
        { label: 'Sparkles', value: 'sparkles' },
        { label: 'Zap', value: 'zap' },
        { label: 'Tournament', value: 'tournament' },
      ],
      admin: {
        description: 'ไอคอนที่ใช้แสดงในส่วนหัวของหมวดหมู่',
      },
    },
    {
      name: 'color',
      type: 'select',
      required: true,
      label: 'Color Theme',
      defaultValue: 'text-primary',
      options: [
        { label: 'Primary (Blue)', value: 'text-primary' },
        { label: 'Secondary (Yellow)', value: 'text-secondary' },
        { label: 'Tertiary (Green/Cyan)', value: 'text-tertiary' },
      ],
      admin: {
        description: 'โทนสีที่ใช้กับไอคอนในหมวดหมู่นี้',
      },
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      required: true,
      label: 'Associated Skills',
      admin: {
        description: 'เลือกสกิลย่อยที่อยู่ในหมวดหมู่นี้ โดยเลือกจากคอลเลกชัน Skills',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'จัดลำดับการแสดงผลบนหน้าเว็บไซต์ (ค่าน้อยจะแสดงก่อน)',
      },
    },
  ],
}
