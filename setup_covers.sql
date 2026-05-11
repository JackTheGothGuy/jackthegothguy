-- ============================================
-- Jack's Vault Covers - Database Setup
-- Run this in phpMyAdmin or MySQL CLI
-- Requires jacks_vault database to already exist (from guestbook setup)
-- ============================================

USE jacks_vault;

-- Cover videos table (static data, but allows adding covers later)
CREATE TABLE IF NOT EXISTS covers (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cover_number INT UNSIGNED NOT NULL UNIQUE,
    title        VARCHAR(100) NOT NULL,
    artist       VARCHAR(100) NOT NULL,
    album        VARCHAR(150) DEFAULT '',
    genre        VARCHAR(80)  DEFAULT '',
    gear         VARCHAR(150) DEFAULT '',
    notes        TEXT         DEFAULT '',
    video_src    VARCHAR(200) DEFAULT '',
    date_added   DATE         DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comments table
CREATE TABLE IF NOT EXISTS cover_comments (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cover_id     INT UNSIGNED NOT NULL,
    name         VARCHAR(60)  NOT NULL,
    comment_text TEXT         NOT NULL,
    rating       TINYINT UNSIGNED NOT NULL DEFAULT 5,
    ip_address   VARCHAR(45)  DEFAULT '',
    created_at   DATETIME     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cover_id) REFERENCES covers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;





-- Seed covers
INSERT INTO covers (cover_number, title, artist, album, genre, gear, notes, video_src, date_added) VALUES
(1, 'Eruption', 'Van Halen', 'Van Halen (1978)', 'Hard Rock', 'Stratocaster, shitty amp',
 'my first hard solo attempt, i was a beginner back then, i just needed to practice more!! but it''s the best i could do at the time',
 'Resources/Videos/eruption.mp4', '2003-04-01');