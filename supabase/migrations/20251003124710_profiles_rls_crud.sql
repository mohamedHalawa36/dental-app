-- Create the new update policy 
CREATE POLICY "update_profiles_policy"
ON profiles
FOR UPDATE
TO authenticated
USING (
  -- Always require that the user performing the update is active and not deleted
  EXISTS (
    SELECT 1
    FROM profiles me
    WHERE me.id = auth.uid()
      AND me.is_active = true
      AND me.deleted_at IS NULL
  )
)
WITH CHECK (
  -- Allow update only if the user is admin (active, not deleted) OR updating their own profile
  (
    id = auth.uid()
  )
  OR
  (
    EXISTS (
      SELECT 1
      FROM profiles me
      WHERE me.id = auth.uid()
        AND me.is_admin = true
        AND me.is_active = true
        AND me.deleted_at IS NULL
    )
  )
);

-- Create a new delete policy
CREATE POLICY "delete_profiles_policy"
ON profiles
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles me
    WHERE me.id = auth.uid()
      AND me.is_admin = true
      AND me.is_active = true
      AND me.deleted_at IS NULL
  )
);

-- Create a new insert policy
CREATE POLICY "only_admins_can_insert_profiles"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles me
    WHERE me.id = auth.uid()
      AND me.is_admin = true
      AND me.is_active = true
      AND me.deleted_at IS NULL
  )
);
