import { getProfile } from "@/libs/data";
import { Information } from "./Information";
import { Portrait } from "./Portrait";

// Used until a resume is uploaded in Payload (Globals → Profile).
// This signed URL expires on 2027-06-29.
const FALLBACK_RESUME_URL =
  "https://wbcylprqunqsmppnlprf.supabase.co/storage/v1/object/sign/resume/Resume%20Prapat%20Prapatsornmanu.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZTc2YmY2Yy1iZTlmLTQxNzItODM5OS0yZWM2ZmZlMWFjNzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyZXN1bWUvUmVzdW1lIFByYXBhdCBQcmFwYXRzb3JubWFudS5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyNzI0NjMzLCJleHAiOjE4MTQyNjA2MzN9.UcXuZ-LSc2s59f5Syu681xGJIoIERYBZ4dtxVZJrv0c";

const Theatre = async () => {
  const profile = await getProfile();
  const resume = profile.resume;
  const resumeUrl =
    (resume && typeof resume === "object" && resume.url) || FALLBACK_RESUME_URL;

  return (
    <section
      id="intro"
      className="c-section flex flex-col justify-center gap-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full lg:size-1/2 bg-primary/20 blur-[120px] pointer-events-none" />

      <div className="c-container">
        <div className="grid place-items-center grid-cols-6 lg:grid-cols-12 gap-y-10 gap-x-4">
          <div className="col-start-2 col-span-4 lg:col-start-auto lg:col-span-5 lg:order-last">
            <Portrait />
          </div>
          <div className="col-span-6 lg:col-span-7">
            <Information resumeUrl={resumeUrl} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Theatre };
