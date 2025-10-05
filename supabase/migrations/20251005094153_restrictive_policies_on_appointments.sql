-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "do all for auth" ON public.appointments;

-- Recreate the restrictive policy
CREATE POLICY "do all for auth"
ON public.appointments
as restrictive
FOR ALL
TO authenticated
USING (
  (appointments.date >= CURRENT_DATE)
  AND EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.is_active = TRUE
      AND profiles.deleted_at IS NULL
  )
)
WITH CHECK (
  (appointments.date >= CURRENT_DATE)
  AND EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.is_active = TRUE
      AND profiles.deleted_at IS NULL
  )
);
