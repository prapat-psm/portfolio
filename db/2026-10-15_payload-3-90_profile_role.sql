-- Schema changes for: Payload 3.80 -> 3.90 upgrade, projects.role, profile global.
-- Additive only (no drops). Payload pushes these automatically in `npm run dev`;
-- apply this manually on a database that only production deploys touch.
-- The stacks."order" column is left in place on purpose (field removed, data kept).

ALTER TABLE public.media ADD COLUMN IF NOT EXISTS _objectkey character varying;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS reset_password_requested_at timestamp(3) with time zone;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS role character varying;

CREATE TABLE IF NOT EXISTS public.profile (
  id serial PRIMARY KEY,
  resume_id integer REFERENCES public.media(id) ON DELETE SET NULL,
  updated_at timestamp(3) with time zone,
  created_at timestamp(3) with time zone
);
CREATE INDEX IF NOT EXISTS profile_resume_idx ON public.profile USING btree (resume_id);

-- Keep Supabase's Data API locked out, like every other Payload table.
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
