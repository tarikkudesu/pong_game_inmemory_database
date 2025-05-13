CREATE TABLE IF NOT EXISTS invitations (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	sender_id INTEGER NOT NULL,
	recipient_id INTEGER NOT NULL,
	invite_status TEXT NOT NULL DEFAULT "pending",
	expires_at TEXT NOT NULL,
	deleted_at TEXT NOT NULL,

	CHECK (expires_at IS NOT NULL),
	CHECK (invite_status IN ("pending", "accepted", "declined", "expired")), -- pending, accepted, declined, expired
	FOREIGN KEY (sender_id) REFERENCES players(player_id) ON DELETE CASCADE,
	FOREIGN KEY (recipient_id) REFERENCES players(player_id) ON DELETE CASCADE
);

-- ! Dummy data
-- INSERT INTO invitations (sender_id, recipient_id, expires_at, deleted_at) VALUES
-- ("1", "2", datetime('now', '+1 minute'), datetime('now', '+2 minute')),
-- ("1", "3", datetime('now', '+1 minute'), datetime('now', '+2 minute')),
-- ("1", "4", datetime('now', '+1 minute'), datetime('now', '+2 minute')),
-- ("2", "3", datetime('now', '+1 minute'), datetime('now', '+2 minute')),
-- ("2", "4", datetime('now', '+1 minute'), datetime('now', '+2 minute'));
