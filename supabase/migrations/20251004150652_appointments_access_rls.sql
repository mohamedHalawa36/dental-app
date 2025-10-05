-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Doctors can delete thier appointments only" ON public.appointments;
DROP POLICY IF EXISTS "doctors can only see thier appointments" ON public.appointments;
DROP POLICY IF EXISTS "Doctors can only update thier appointments" ON public.appointments;

-- Create SELECT policy
CREATE POLICY "Doctors can select their appointments only"
ON public.appointments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND (
        profiles.is_admin = true
        OR profiles.role = 'nurse'::user_role
        OR (
          profiles.role = 'doctor'::user_role
          AND appointments.doctor_id = auth.uid()
        )
      )
  )
);

-- Create UPDATE policy
CREATE POLICY "Doctors can update their appointments only"
ON public.appointments
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND (
        profiles.is_admin = true
        OR profiles.role = 'nurse'::user_role
        OR (
          profiles.role = 'doctor'::user_role
          AND appointments.doctor_id = auth.uid()
        )
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
        profiles.is_admin = true
        OR profiles.role = 'nurse'::user_role
        OR (
          profiles.role = 'doctor'::user_role
          AND appointments.doctor_id = auth.uid()
        )
      )
  )
);

-- Create DELETE policy
CREATE POLICY "Doctors can delete thier appointments only"
ON public.appointments
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE 
      profiles.id = auth.uid()
      AND (
        profiles.is_admin = true
        OR profiles.role = 'nurse'::user_role
        OR (
          profiles.role = 'doctor'::user_role
          AND appointments.doctor_id = auth.uid()
        )
      )
  )
);
