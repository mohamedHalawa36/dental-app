DROP POLICY IF EXISTS "do All for Auth" ON public.doctor_availability;

CREATE POLICY "do All for Auth"
ON public.doctor_availability
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