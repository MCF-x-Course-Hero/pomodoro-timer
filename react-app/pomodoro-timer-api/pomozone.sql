\echo 'Delete and recreate pomozone db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE pomozone;
CREATE DATABASE pomozone;
\connect pomozone;

\i pomozone-schema.sql;

\echo 'Delete and recreate pomozone_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE pomozone_test;
CREATE DATABASE pomozone_test;
\connect pomozone_test

\i pomozone-schema.sql