CREATE TABLE players (
	player_id INTEGER PRIMARY KEY,
	player_hash TEXT NOT NULL,
	username TEXT NOT NULL,
	img TEXT
);

-- ! Dummy data
-- INSERT INTO players (player_hash, username, img) VALUES
-- ("asdf", "otman", "o.png"),
-- ("asfe", "mustapha", "m.png"),
-- ("oiyu", "omar", "om.jpg");
