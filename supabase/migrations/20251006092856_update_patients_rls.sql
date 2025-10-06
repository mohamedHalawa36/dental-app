DROP POLICY IF EXISTS "Do all for Auth users" ON public.patients;
DROP POLICY IF EXISTS "Doctors can only delete the patients they created" ON public.patients;
DROP POLICY IF EXISTS "Doctors can only update the patients they added" ON public.patients;

CREATE POLICY "do All for Auth"
ON public.patients
as permissive
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.is_active = TRUE
      AND profiles.deleted_at IS NULL
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.is_active = TRUE
      AND profiles.deleted_at IS NULL
  )
);

CREATE POLICY "only nurses can add patients"
ON public.patients
as restrictive
FOR insert
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.role = 'nurse'::user_role
  )
);

CREATE POLICY "only nurses can update patients"
ON public.patients
as restrictive
FOR update
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.role = 'nurse'::user_role
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.role = 'nurse'::user_role
  )
);

CREATE POLICY "only nurses can delete patients"
ON public.patients
as restrictive
FOR delete
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.role = 'nurse'::user_role
  )
);