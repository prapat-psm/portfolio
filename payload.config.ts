import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { migrations } from "./migrations";
import { s3Storage } from "@payloadcms/storage-s3";
import { Projects } from "@/collections/Projects";
import { Skills } from "@/collections/Skills";
import { Stacks } from "@/collections/Stacks";
import { Media } from "@/collections/Media";
import { WorkExperiences } from "./collections/WorkExperiences";
import { Profile } from "@/globals/Profile";

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET is not set. Add it to your .env file.");
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    admin: "/admin",
  },

  // Define and configure your collections in this array
  collections: [Media, Projects, Skills, Stacks, WorkExperiences],
  globals: [Profile],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET,
  // Whichever Database Adapter you're using should go here

  // Configure the Postgres adapter here
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    migrationDir: path.resolve(dirname, "migrations"),
    // Dev: schema is pushed automatically. Prod: run committed migrations on connect.
    // After changing collections/globals, run `npm run migrate:create <name>` and commit it.
    push: true,
    prodMigrations: migrations,
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],

  // generate type
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
    autoGenerate: true,
  },
});
