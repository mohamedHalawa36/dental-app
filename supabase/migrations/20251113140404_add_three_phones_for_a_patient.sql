-- 1️⃣ Add new columns as NULLABLE
ALTER TABLE public.patients
ADD COLUMN phone1 TEXT,
ADD COLUMN phone1_has_whatsapp BOOLEAN DEFAULT FALSE,
ADD COLUMN phone2 TEXT NULL,
ADD COLUMN phone2_has_whatsapp BOOLEAN NULL,
ADD COLUMN phone3 TEXT NULL,
ADD COLUMN phone3_has_whatsapp BOOLEAN NULL;

-- 2️⃣ Copy old data if exists
UPDATE public.patients
SET 
  phone1 = phone,
  phone1_has_whatsapp = phone_has_whatsapp;

-- 3️⃣ Drop old columns
ALTER TABLE public.patients
DROP COLUMN phone,
DROP COLUMN phone_has_whatsapp;

-- 4️⃣ Now make phone1 and phone1_has_whatsapp NOT NULL
ALTER TABLE public.patients
ALTER COLUMN phone1 SET NOT NULL,
ALTER COLUMN phone1_has_whatsapp SET NOT NULL;
