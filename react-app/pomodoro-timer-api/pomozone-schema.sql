CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- for now, it not mandatory to insert starting time/ending time for each sessions. simply need the duration.
CREATE TABLE userSessions (
    id              SERIAL PRIMARY KEY,
    user_id         INT NOT NULL,
    duration        INT NOT NULL,
    session_type    TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY     (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE userTasks (
    id              SERIAL PRIMARY KEY,
    task            TEXT NOT NULL,
    is_completed    BOOLEAN NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id         INT NOT NULL,
    FOREIGN KEY     (user_id) REFERENCES users(id) ON DELETE CASCADE,
    session_id      INT,
    FOREIGN KEY     (session_id) REFERENCES userSessions(id) ON DELETE CASCADE
);
