-- Schema for the service. Schema's and extensions are managed by devops (for staging and prod) and
-- in schema-dev.sql for dev environment


CREATE TABLE IF NOT EXISTS forms (
    uuid UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    items JSONB,
    archived BOOL DEFAULT false
);
