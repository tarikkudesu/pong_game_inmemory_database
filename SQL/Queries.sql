-- ! ONLINE

-- ? player manipulation queries
-- * new player
INSERT INTO players(player_hash, username, img) VALUES(?, ?, ?);
-- * remove player
DELETE FROM players WHERE username = ?

-- ? Selection quiries
-- * get player id
SELECT player_id FROM players WHERE username = ?;
-- * select all player
SELECT * FROM players;
-- * select username + img player
SELECT username, img FROM players;
-- * select username + img from all players but the user
SELECT username, img FROM players WHERE NOT username = ?;
-- * select players with invitation status
SELECT p.username, p.img, IFNULL((
	SELECT invite_status FROM invitations WHERE sender_id = ? AND recipient_id = p.player_id), "not sent"
) as status
FROM players p
WHERE NOT player_id = ?;


-- ! INVITATIONS

-- ? invite_status manipulation queries
-- * update accepted invitation
UPDATE invitations SET invite_status = "accepted" WHERE invite_status = "pending" AND sender_id = ? AND recipient_id = ?;
-- * update declined invitation
UPDATE invitations SET invite_status = "declined" WHERE invite_status = "pending" AND sender_id = ? AND recipient_id = ?;
-- * update expired invitations
UPDATE invitations SET invite_status = "expired" WHERE invite_status = "pending" AND datetime("now") > expires_at;
-- * delete all to be deleted invitation
DELETE FROM invitations WHERE datetime("now") > deleted_at;
-- * cancel invitation
DELETE FROM invitations WHERE sender_id = ? AND recipient_id = ?;
-- * cancel all invitations
DELETE FROM invitations WHERE sender_id = ? OR recipient_id = ?;
-- * delete a rejected invitation for a specific user
DELETE FROM invitations WHERE invite_status = "declined" AND sender_id = ? AND recipient_id = ?;
-- * delete all rejected invitation for a specific user
DELETE FROM invitations WHERE invite_status = "declined" AND sender_id = ?;

-- ? selection queries
SELECT * FROM invitations;
-- * select invitations that a specific user sent to specific user
SELECT (
	SELECT username FROM players WHERE players.player_id = invitations.sender_id
) AS sender, (
	SELECT username FROM players WHERE players.player_id = invitations.recipient_id
) AS recipient, invite_status FROM invitations WHERE sender_id = ?;
-- * get a specific invitation
SELECT id FROM invitations WHERE sender_id = ? AND recipient_id = ?;
-- * select expired invitations
SELECT * FROM invitations WHERE datetime("now") > expires_at;
-- * select to be deleted invitations
SELECT * FROM invitations WHERE datetime("now") > deleted_at;


-- ! CHAT
