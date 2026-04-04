import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Skills } from "./collections/Skills";
import { Stacks } from "./collections/Stacks";
import { WorkExperiences } from "./collections/WorkExperiences";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  admin: {},

  // Define and configure your collections in this array
  collections: [Media, Projects, Skills, Stacks, WorkExperiences],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here

  // Configure the SQLite adapter here
  db: sqliteAdapter({
    // SQLite-specific arguments go here.
    // `client.url` is required.
    client: {
      url: process.env.DATABASE_URL || "",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
