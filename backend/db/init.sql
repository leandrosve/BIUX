-- CREATE DATABASE IF NOT EXISTS db_biux
SELECT 'CREATE DATABASE db_biux'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_biux')\gexec