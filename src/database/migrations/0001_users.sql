-- hello@world.it/helloWorld!
INSERT INTO `random_movie_db`.`tokens`
(`uuid`,
 `insert_datetime`,
 `consumed`,
 `consumed_datetime`)
VALUES ('5c4b5d4b-d4c4-4acb-939f-5b9a2c7300a0', '2024-08-23 12:30:23', 1, '2024-08-23 12:30:29');

INSERT INTO `random_movie_db`.`credentials`
(`email`,
 `password`,
 `token_id`,
 `enabled`)
VALUES ('hello@world.it', '$2b$10$YTkygiqrlVGBQJNDkjfhkukrW62fouaQWV2.3VqZ.zd0zi3bRENSG', 1, 1);

INSERT INTO `random_movie_db`.`users`
(`display_name`,
 `credential_id`,
 `insert_datetime`)
VALUES ('HelloWorld!', 1, '2024-08-23 12:30:23');

-- dsa@dsa.it/dsadsadsa
INSERT INTO `random_movie_db`.`tokens`
(`uuid`,
 `insert_datetime`)
VALUES ('6eb9525a-9338-4812-b3af-7406af65e023', '2024-08-26 12:42:54');

INSERT INTO `random_movie_db`.`credentials`
(`email`,
 `password`,
 `token_id`,
 `enabled`)
VALUES ('dsa@dsa.it', '$2b$10$utrpdD28TxAr5TPxgaxJaeNK/aEv1GNi36iq1grzSPRPzDaxZJI.6', 2, 0);

INSERT INTO `random_movie_db`.`users`
(`display_name`,
 `credential_id`,
 `insert_datetime`)
VALUES ('DsaDsa', 2, '2024-08-26 12:42:55');


-- Movies
INSERT INTO `random_movie_db`.`movies`
(`external_id`,
 `title`,
 `original_title`,
 `poster_path`)
VALUES (1022789, 'Inside Out 2', 'Inside Out 2', '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg');
INSERT INTO `random_movie_db`.`movies`
(`external_id`,
 `title`,
 `original_title`,
 `poster_path`)
VALUES (826510, 'Il magico mondo di Harold', 'Harold and the Purple Crayon', '/dEsuQOZwdaFAVL26RjgjwGl9j7m.jpg');
INSERT INTO `random_movie_db`.`movies`
(`external_id`,
 `title`,
 `original_title`,
 `poster_path`)
VALUES (107113, 'Come rubammo la bomba atomica', 'Come rubammo la bomba atomica', '/ce87PsssphNas2z1snA98D790Sf.jpg');
INSERT INTO `random_movie_db`.`movies`
(`external_id`,
 `title`,
 `original_title`,
 `poster_path`)
VALUES (970347, 'The Killer', 'The Killer', '/6PCnxKZZIVRanWb710pNpYVkCSw.jpg');

INSERT INTO `random_movie_db`.`user_movies_to_watch_later`
(`user_id`,
 `movie_id`)
VALUES (1, 1);
INSERT INTO `random_movie_db`.`user_movies_to_watch_later`
(`user_id`,
 `movie_id`)
VALUES (1, 2);

INSERT INTO `random_movie_db`.`user_ignored_movies`
(`user_id`,
 `movie_id`)
VALUES (1, 3);
INSERT INTO `random_movie_db`.`user_ignored_movies`
(`user_id`,
 `movie_id`)
VALUES (1, 4);
