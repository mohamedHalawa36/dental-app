ALTER TABLE profiles
ADD COLUMN deleted_at TIMESTAMPTZ NULL,
ADD COLUMN deleted_by UUID NULL REFERENCES auth.users(id);

-- Create new select policy to exclude soft-deleted rows
CREATE POLICY "Select Only non-deleted"
ON profiles
FOR SELECT
TO authenticated
USING (deleted_at IS NULL);