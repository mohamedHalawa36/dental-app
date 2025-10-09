DROP POLICY IF EXISTS "only nurses can add patients" ON public.patients;
DROP POLICY IF EXISTS "only nurses can update patients" ON public.patients;
DROP POLICY IF EXISTS "only nurses can delete patients" ON public.patients;

-- Allow only nurses or admins to insert patients
CREATE POLICY "only nurses and admins can add patients"
ON public.patients
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND (
        profiles.role = 'nurse'::user_role
        OR profiles.is_admin = TRUE
      )
  )
);

-- Allow only nurses or admins to update patients
CREATE POLICY "only nurses and admins can update patients"
ON public.patients
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND (
        profiles.role = 'nurse'::user_role
        OR profiles.is_admin = TRUE
      )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND (
        profiles.role = 'nurse'::user_role
        OR profiles.is_admin = TRUE
      )
  )
);

-- Allow only nurses or admins to delete patients
CREATE POLICY "only nurses and admins can delete patients"
ON public.patients
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND (
        profiles.role = 'nurse'::user_role
        OR profiles.is_admin = TRUE
      )
  )
);
