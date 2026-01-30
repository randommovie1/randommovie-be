CREATE TABLE tokens
(
    `id`                BIGINT PRIMARY KEY AUTO_INCREMENT,
    `uuid`              varchar(255) NOT NULL UNIQUE,
    `insert_datetime`   DATETIME     NOT NULL DEFAULT (SYSDATE()),
    `consumed`          BOOLEAN      NOT NULL DEFAULT (false),
    `consumed_datetime` DATETIME
) COMMENT='Credential''s content';
CREATE INDEX `IDX_GlHBsbUx` ON tokens (`uuid`);

CREATE TABLE credentials
(
    `id`       BIGINT PRIMARY KEY AUTO_INCREMENT,
    `email`    varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `token_id` BIGINT       NOT NULL UNIQUE,
    `enabled`  BOOLEAN      NOT NULL DEFAULT (false),

    FOREIGN KEY (`token_id`) REFERENCES tokens (`id`)
) COMMENT='User''s credential';
CREATE INDEX `IDX_wNOhiLi8` ON credentials (`email`);

CREATE TABLE users
(
    `id`              BIGINT PRIMARY KEY AUTO_INCREMENT,
    `display_name`    varchar(255) NOT NULL UNIQUE,
    `credential_id`   BIGINT       NOT NULL,
    `insert_datetime` DATETIME     NOT NULL DEFAULT (SYSDATE()),
    `deleted`         BOOLEAN      NOT NULL DEFAULT (false),

    FOREIGN KEY (`credential_id`) REFERENCES credentials (`id`)
) COMMENT='Users';
CREATE INDEX `IDX_zqG9z0tl` ON users (`display_name`);

CREATE TABLE `movies`
(
    `id`             BIGINT PRIMARY KEY AUTO_INCREMENT,
    `external_id`    BIGINT       NOT NULL UNIQUE,
    `title`          VARCHAR(255) NOT NULL,
    `original_title` VARCHAR(255) NOT NULL,
    `poster_path`    VARCHAR(255) NOT NULL UNIQUE
) COMMENT='Movies';

CREATE TABLE `user_movies_to_watch_later`
(
    `user_id`  BIGINT NOT NULL,
    `movie_id` BIGINT NOT NULL,

    FOREIGN KEY (`user_id`) REFERENCES users (`id`),
    FOREIGN KEY (`movie_id`) REFERENCES movies (`id`)
) COMMENT='Movies that user has chosen to watch later';
ALTER TABLE `user_movies_to_watch_later`
    ADD UNIQUE `unique_index`(`user_id`, `movie_id`);

CREATE TABLE `user_ignored_movies`
(
    `user_id`  BIGINT NOT NULL,
    `movie_id` BIGINT NOT NULL,

    FOREIGN KEY (`user_id`) REFERENCES users (`id`),
    FOREIGN KEY (`movie_id`) REFERENCES movies (`id`)
) COMMENT='Movies that user has chosen to ignore';
ALTER TABLE `user_ignored_movies`
    ADD UNIQUE `unique_index`(`user_id`, `movie_id`);
