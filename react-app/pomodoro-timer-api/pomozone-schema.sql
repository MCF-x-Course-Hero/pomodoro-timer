CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL,
    password    TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- for now, it not mandetory to insert starting time/ending time for each sessions. simply need the duration.
CREATE TABLE userSessions (
    id              SERIAL PRIMARY KEY,
    user_id         INT NOT NULL,
    FOREIGN KEY     (user_id) REFERENCES users(id) ON DELETE CASCADE,
    second          INT NOT NULL, 
    minute          INT NOT NULL,
    hour            INT NOT NULL,
    starting        date NOT NULL,
    ending          date NOT NULL,
    session_type    TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
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
