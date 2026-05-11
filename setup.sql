CREATE DATABASE IF NOT EXISTS jacks_vault CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE jacks_vault;

CREATE TABLE IF NOT EXISTS guestbook_entries (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(80)  NOT NULL,
    location    VARCHAR(80)  DEFAULT '',
    website_url VARCHAR(200) DEFAULT '',
    aim_msn     VARCHAR(80)  DEFAULT '',
    referrer    VARCHAR(80)  DEFAULT '',
    mood        VARCHAR(40)  DEFAULT '',
    message     TEXT         NOT NULL,
    ip_address  VARCHAR(45)  DEFAULT '',
    created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

