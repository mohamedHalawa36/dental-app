-- 1️⃣ Create the "notes" table
CREATE TABLE public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  note text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;


-- 2️⃣ Policy: Do All for auth doctors (permissive)
CREATE POLICY "do all for auth doctors"
ON public.notes
AS PERMISSIVE
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = (select auth.uid())
    AND profiles.is_active = TRUE
    AND profiles.deleted_at IS NULL
    AND profiles.role = 'doctor'::user_role
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = (select auth.uid())
    AND profiles.is_active = TRUE
    AND profiles.deleted_at IS NULL
    AND profiles.role = 'doctor'::user_role
  )
);


-- 3️⃣ Policy: Only doctors can add their own notes
CREATE POLICY "only doctors can add notes"
ON public.notes
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = (select auth.uid())
    AND profiles.role = 'doctor'::user_role
    AND profiles.is_active = TRUE
    AND profiles.deleted_at IS NULL
  )
  AND doctor_id = (select auth.uid())
);


-- 4️⃣ Policy: Only doctors can update their own notes
CREATE POLICY "only doctors can update notes"
ON public.notes
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (
  doctor_id = (select auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = (select auth.uid())
    AND profiles.role = 'doctor'::user_role
    AND profiles.is_active = TRUE
    AND profiles.deleted_at IS NULL
  )
)
WITH CHECK (
  doctor_id = (select auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = (select auth.uid())
    AND profiles.role = 'doctor'::user_role
    AND profiles.is_active = TRUE
    AND profiles.deleted_at IS NULL
  )
);


-- 5️⃣ Policy: Only doctors can delete their own notes
CREATE POLICY "only doctors can delete notes"
ON public.notes
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (
  doctor_id = (select auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = (select auth.uid())
    AND profiles.role = 'doctor'::user_role
    AND profiles.is_active = TRUE
    AND profiles.deleted_at IS NULL
  )
);
