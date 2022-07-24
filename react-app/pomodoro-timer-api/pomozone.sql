\echo 'Delete and recreate pomozone db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE pomozone;
CREATE DATABASE pomozone;
\connect pomozone;

\i pomozone-schema.sql;

