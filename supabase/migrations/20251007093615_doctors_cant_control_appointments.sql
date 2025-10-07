DROP POLICY IF EXISTS "Doctors can delete thier appointments only" ON public.appointments;
DROP POLICY IF EXISTS "Doctors can update their appointments only" ON public.appointments;

-- Prevent doctors (non-admins) from inserting appointments
CREATE POLICY "prevent_doctors_from_inserting_appointments"
ON public.appointments
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (
  NOT EXISTS (
    SELECT 1
    FROM profiles
    WHERE
      profiles.id = (select auth.uid())
      AND profiles.role = 'doctor'
      AND profiles.is_admin = FALSE
      AND profiles.is_active = TRUE
      AND profiles.deleted_at IS NULL
  )
);

-- Prevent doctors (non-admins) from updating appointments
CREATE POLICY "prevent_doctors_from_updating_appointments"
ON public.appointments
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (
  NOT EXISTS (
    SELECT 1
    FROM profiles
    WHERE
      profiles.id = (select auth.uid())
      AND profiles.role = 'doctor'
      AND profiles.is_admin = FALSE
      AND profiles.is_active = TRUE
      AND profiles.deleted_at IS NULL
  )
)
WITH CHECK (
  NOT EXISTS (
    SELECT 1
    FROM profiles
    WHERE
      profiles.id = (select auth.uid())
      AND profiles.role = 'doctor'
      AND profiles.is_admin = FALSE
      AND profiles.is_active = TRUE
      AND profiles.deleted_at IS NULL
  )
);

-- Prevent doctors (non-admins) from deleting appointments
CREATE POLICY "prevent_doctors_from_deleting_appointments"
ON public.appointments
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (
  NOT EXISTS (
    SELECT 1
    FROM profiles
    WHERE
      profiles.id = (select auth.uid())
      AND profiles.role = 'doctor'
      AND profiles.is_admin = FALSE
      AND profiles.is_active = TRUE
      AND profiles.deleted_at IS NULL
  )
);

