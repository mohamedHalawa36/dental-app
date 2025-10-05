DROP POLICY IF EXISTS "do All for Auth" ON public.doctor_availability;

CREATE POLICY "do All for Auth"
ON public.doctor_availability
as restrictive
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

CREATE POLICY "Only Doctor can add his availability"
ON public.doctor_availability
as restrictive
FOR Insert
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.is_active = TRUE
      AND profiles.role = 'doctor'::user_role
      AND profiles.deleted_at IS NULL
      AND profiles.id = doctor_availability.doctor_id
  )
);

CREATE POLICY "Only Doctor can update his availability"
ON public.doctor_availability
as restrictive
FOR update
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.is_active = TRUE
      AND profiles.role = 'doctor'::user_role
      AND profiles.deleted_at IS NULL
      AND profiles.id = doctor_availability.doctor_id
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.is_active = TRUE
      AND profiles.role = 'doctor'::user_role
      AND profiles.deleted_at IS NULL
      AND profiles.id = doctor_availability.doctor_id
  )
);

CREATE POLICY "Only Doctor can delete his availability"
ON public.doctor_availability
as restrictive
FOR delete
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND profiles.is_active = TRUE
      AND profiles.role = 'doctor'::user_role
      AND profiles.deleted_at IS NULL
      AND profiles.id = doctor_availability.doctor_id
  )
);