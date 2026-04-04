import { CollectionConfig } from "payload";

const themeColors = [
  { label: "Orange", value: "text-orange-400" },
  { label: "Amber", value: "text-amber-400" },
  { label: "Yellow", value: "text-yellow-400" },
  { label: "Lime", value: "text-lime-400" },
  { label: "Green", value: "text-green-400" },
  { label: "Emerald", value: "text-emerald-400" },
  { label: "Teal", value: "text-teal-400" },
  { label: "Cyan", value: "text-cyan-400" },
  { label: "Sky", value: "text-sky-400" },
  { label: "Blue", value: "text-blue-400" },
  { label: "Indigo", value: "text-indigo-400" },
  { label: "Violet", value: "text-violet-400" },
  { label: "Purple", value: "text-purple-400" },
  { label: "Fuchsia", value: "text-fuchsia-400" },
  { label: "Pink", value: "text-pink-400" },
  { label: "Rose", value: "text-rose-400" },
];

export const Stacks: CollectionConfig = {
  slug: "stacks",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Category Title",
      admin: {
        description:
          "ชื่อกลุ่มของสกิล (เช่น Core Tech, Full-stack Engineering)",
      },
    },
    {
      name: "icon",
      type: "select",
      required: true,
      label: "Category Icon",
      options: [
        { label: "Bracket", value: "bracket" },
        { label: "Database", value: "database" },
        { label: "Terminal", value: "terminal" },
        { label: "Blocks", value: "blocks" },
        { label: "Sparkles", value: "sparkles" },
        { label: "Zap", value: "zap" },
        { label: "Tournament", value: "tournament" },
      ],
      admin: {
        description: "ไอคอนที่ใช้แสดงในส่วนหัวของหมวดหมู่",
      },
    },
    {
      name: "color",
      type: "select",
      required: true,
      label: "Color Theme",
      defaultValue: "text-violet-400",
      options: themeColors,
      admin: {
        description: "โทนสีที่ใช้กับไอคอนในหมวดหมู่นี้",
      },
    },
    {
      name: "skills",
      type: "relationship",
      relationTo: "skills",
      hasMany: true,
      required: true,
      label: "Associated Skills",
      admin: {
        description:
          "เลือกสกิลย่อยที่อยู่ในหมวดหมู่นี้ โดยเลือกจากคอลเลกชัน Skills",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Display Order",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "จัดลำดับการแสดงผลบนหน้าเว็บไซต์ (ค่าน้อยจะแสดงก่อน)",
      },
    },
  ],
};
