import { CollectionConfig, FieldHook } from "payload";

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

const formatSlug: FieldHook = ({ operation, value, originalDoc, data }) => {
  if (typeof value === "string") {
    return format(value);
  }

  if (operation === "create" || operation === "update") {
    const title = data?.title || originalDoc?.title;

    if (title && typeof title === "string") {
      return format(title);
    }
  }

  return value;
};

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  orderable: true,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Project Name",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL slug (auto-generated from title)",
      },
      hooks: {
        beforeValidate: [formatSlug],
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Cover Image",
      admin: {
        description: "รูปภาพหน้าปกโปรเจค",
      },
    },
    {
      name: "techStack",
      type: "relationship",
      relationTo: "skills",
      hasMany: true,
      label: "Technology Stack (Relations)",
      admin: {
        description: "เลือกเทคโนโลยีที่ใช้ (ดึงจากคอลเลกชัน Skills)",
      },
    },
    {
      name: "shortDescription",
      type: "textarea",
      label: "Description",
      admin: {
        description: "คำอธิบายสำหรับแสดงบนหน้า Card ของโปรเจค",
      },
    },
    {
      name: "links",
      type: "group",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "websiteUrl",
          type: "text",
          label: "Live Website URL",
        },
      ],
    },
    {
      name: "completionDate",
      type: "date",
      label: "Completion Date / Year",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "monthOnly",
          displayFormat: "yyyy-MM",
        },
      },
    },
  ],
};
