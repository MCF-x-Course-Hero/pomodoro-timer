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

CREATE TABLE userSettings (
    pTime           INT NOT NULL,
    sbTime          INT NOT NULL,
    lbTime          INT NOT NULL,
    pColor          TEXT NOT NULL,
    sbColor         TEXT NOT NULL,
    lbColor         TEXT NOT NULL,
    dark_mode       BOOLEAN NOT NULL,
    notif_toggle    BOOLEAN NOT NULL,
    auto_toggle     BOOLEAN NOT NULL,
    num_sessions    INT NOT NULL,
    sound_choice    TEXT NOT NULL,
    confetti        BOOLEAN NOT NULL,
    pause_music     BOOLEAN NOT NULL,
    inspiration     BOOLEAN NOT NULL,
    user_id         INT NOT NULL,
    FOREIGN KEY     (user_id) REFERENCES users(id) ON DELETE CASCADE
);