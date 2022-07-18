CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL,
    password    TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);