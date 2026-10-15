import type { GlobalConfig } from "payload";
import { CACHE_TAGS } from "@/libs/cache-tags";
import { revalidateCollection } from "@/libs/revalidate";

export const Profile: GlobalConfig = {
  slug: "profile",
  label: "Profile",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: revalidateCollection([CACHE_TAGS.profile]).afterChange,
  },
  fields: [
    {
      name: "resume",
      type: "upload",
      relationTo: "media",
      label: "Resume (PDF)",
      admin: {
        description: "ไฟล์ Resume ที่ปุ่ม Download บนหน้าแรกจะลิงก์ไป",
      },
    },
  ],
};
