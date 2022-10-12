-- This file is meant to init schema and extension needed in the local dev env

GRANT ALL PRIVILEGES ON DATABASE "wizzcad" to "1234567890";

CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions to public;
GRANT EXECUTE ON ALL functions in schema extensions to public;
ALTER DEFAULT PRIVILEGES IN SCHEMA extensions
   GRANT EXECUTE ON functions to public;
ALTER DEFAULT PRIVILEGES IN SCHEMA extensions
   GRANT USAGE ON types to public;

CREATE EXTENSION "uuid-ossp" SCHEMA extensions;

DROP SCHEMA IF EXISTS "wizzcad";
CREATE SCHEMA "wizzcad";

ALTER ROLE "1234567890" SET search_path TO wizzcad;
