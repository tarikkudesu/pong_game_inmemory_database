import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import crypto from 'crypto';

function generateHash(text) {
	return crypto.createHash('sha256').update(text).digest('hex');
}

let db = await open({
	filename: ':memory:',
	driver: sqlite3.Database,
});

let sql = fs.readFileSync('./SQL/invitations.sql', 'utf-8');
await db.exec(sql);
sql = fs.readFileSync('./SQL/online.sql', 'utf-8');
await db.exec(sql);

class Mdb {
	#db = null;
	constructor(db) {
		this.#db = db;
	}

	/****************************************************************************************************************
	 *                                        PLAYERS TABLE MANIPULATION                                            *
	 ****************************************************************************************************************/

	// ? player selection queries

	// * new player
	async addPlayer(username, img) {
		if (await this.getPlayerId(username)) throw new Error('Player already exists');
		const stmt = await this.#db.prepare('INSERT INTO players(player_hash, username, img) VALUES(?, ?, ?)');
		const hash = generateHash(username);
		await stmt.run(hash, username, img);
		return hash;
	}

	// * remove player
	async removePlayer(username) {
		await this.cancelAllUserInvitations(username);
		const stmt = await this.#db.prepare('DELETE FROM players WHERE username = ?');
		await stmt.run(username);
	}

	// * get player id
	async getPlayerId(username) {
		const stmt = await this.#db.prepare('SELECT player_id FROM players WHERE username = ?');
		const id = await stmt.get(username);
		stmt.finalize();
		return id;
	}

	// * select all player
	// ! not ideal

	// * select username + img player
	async getAllPlayers() {
		console.warn('getAllPlayers() is not ideal. Use getAllOtherPlayersWithInviteStatus() instead.');
		const stmt = await this.#db.prepare('SELECT player_hash, username, img FROM players');
		const users = stmt.all();
		stmt.finalize();
		return users;
	}

	// * select username + img from all players but the user
	async getAllOtherPlayers(username) {
		console.warn('getAllOtherPlayers() is not ideal. Use getAllOtherPlayersWithInviteStatus() instead.');
		const stmt = await this.#db.prepare('SELECT username, img FROM players WHERE NOT username = ?');
		const users = stmt.all(username);
		stmt.finalize();
		return users;
	}

	async getAllOtherPlayersWithInviteStatus(username) {
		const user = await this.getPlayerId(username);
		if (!user) throw new Error("Player doesn't exists");
		const stmt = await this.#db.prepare(
			'SELECT p.username, p.img, IFNULL(( \
				SELECT invite_status FROM invitations WHERE sender_id = ? AND recipient_id = p.player_id), "not sent" \
			) as status \
			FROM players p \
			WHERE NOT player_id = ?;'
		);
		const users = stmt.all(user.player_id, user.player_id);
		stmt.finalize();
		return users;
	}

	/****************************************************************************************************************
	 *                                      INVITATIONS TABLE MANIPULATION                                          *
	 ****************************************************************************************************************/

	// ? invite_status manipulation queries
	// * create invitation
	async createInvitation(sender, recipient) {
		const senderUser = await this.getPlayerId(sender);
		const recipientUser = await this.getPlayerId(recipient);
		if (!senderUser || !recipientUser) throw new Error('No such player');
		if (senderUser.player_id === recipient.player_id) throw new Error('Invited yourself, clever huh!!');
		{
			const tstmt = await this.#db.prepare('SELECT id FROM invitations WHERE sender_id = ? AND recipient_id = ?');
			if (await tstmt.get(senderUser.player_id, recipientUser.player_id)) throw new Error('Invitation already exists');
		}
		const stmt = await this.#db.prepare(
			'INSERT INTO invitations(sender_id, recipient_id, expires_at, deleted_at) VALUES(?, ?, datetime("now", "+1 minute"), datetime("now", "+2 minute"))'
		);
		await stmt.run(senderUser.player_id, recipientUser.player_id);
		stmt.finalize();
	}
	// * update accepted invitation
	async acceptInvitation(sender, recipient) {
		const senderUser = await this.getPlayerId(sender);
		const recipientUser = await this.getPlayerId(recipient);
		if (!senderUser || !recipientUser) throw new Error("Player doesn't exists");
		{
			const tstmt = await this.#db.prepare('SELECT id FROM invitations WHERE sender_id = ? AND recipient_id = ?');
			if (!(await tstmt.get(senderUser.player_id, recipientUser.player_id))) throw new Error("Invitation doesn't exists");
		}
		const stmt = await this.#db.prepare('UPDATE invitations SET invite_status = "accepted" WHERE invite_status = "pending" AND sender_id = ? AND recipient_id = ?');
		await stmt.run(senderUser.player_id, recipientUser.player_id);
		stmt.finalize();
	}

	// * update declined invitation
	async declineInvitation(sender, recipient) {
		const senderUser = await this.getPlayerId(sender);
		const recipientUser = await this.getPlayerId(recipient);
		if (!senderUser || !recipientUser) throw new Error("Player doesn't exists");
		const stmt = await this.#db.prepare('UPDATE invitations SET invite_status = "declined" WHERE invite_status = "pending" AND sender_id = ? AND recipient_id = ?');
		await stmt.run(senderUser.player_id, recipientUser.player_id);
		stmt.finalize();
	}

	// * update expired invitations
	async updateExpiredInvitations() {
		const stmt = await this.#db.prepare(
			'UPDATE invitations SET invite_status = "expired" WHERE invite_status = "pending" AND datetime("now") > expires_at'
		);
		await stmt.run();
		stmt.finalize();
	}

	// * delete all to be deleted invitation
	async deleteToBeDeletedInvitations() {
		const stmt = await this.#db.prepare('DELETE FROM invitations WHERE datetime("now") > deleted_at');
		await stmt.run();
		stmt.finalize();
	}

	// * cancel invitation
	async cancelInvitation(sender, recipient) {
		const senderUser = await this.getPlayerId(sender);
		const recipientUser = await this.getPlayerId(recipient);
		if (!senderUser || !recipientUser) throw new Error("Player doesn't exists");
		const stmt = await this.#db.prepare('DELETE FROM invitations WHERE sender_id = ? AND recipient_id = ?');
		await stmt.run(senderUser.player_id, recipientUser.player_id);
		stmt.finalize();
	}

	// * cancel all invitations
	async cancelAllUserInvitations(sender) {
		const senderUser = await this.getPlayerId(sender);
		if (!senderUser) throw new Error("Player doesn't exists");
		const stmt = await this.#db.prepare('DELETE FROM invitations WHERE sender_id = ? OR recipient_id = ?');
		await stmt.run(senderUser.player_id, senderUser.player_id);
		stmt.finalize();
	}

	// * delete a rejected invitation for a specific user
	async deleteRejectedInvitation(sender, recipient) {
		const senderUser = await this.getPlayerId(sender);
		const recipientUser = await this.getPlayerId(recipient);
		if (!senderUser || !recipientUser) throw new Error("Player doesn't exists");
		const stmt = await this.#db.prepare(
			'DELETE FROM invitations WHERE invite_status = "declined" AND sender_id = ? AND recipient_id = ?'
		);
		await stmt.run(senderUser.player_id, recipientUser.player_id);
		stmt.finalize();
	}

	// * delete all rejected invitation for a specific user
	async deleteAllRejectedInvitation(sender) {
		const senderUser = await this.getPlayerId(sender);
		if (!senderUser) throw new Error("Player doesn't exists");
		const stmt = await this.#db.prepare('DELETE FROM invitations WHERE invite_status = "declined" AND sender_id = ?');
		await stmt.run(senderUser.player_id);
		stmt.finalize();
	}

	// ? selection queries
	// ! not ideal

	// * select invitations that a specific user sent to specific user
	async getUserSentInvitations(username) {
		const user = await this.getPlayerId(username);
		if (!user) throw new Error("Player doesn't exists");
		const stmt = await this.#db.prepare(
			'SELECT ( \
				SELECT username FROM players WHERE players.player_id = invitations.sender_id \
			) AS sender, ( \
				SELECT username FROM players WHERE players.player_id = invitations.recipient_id \
			) AS recipient, invite_status FROM invitations WHERE sender_id = ?; \
			'
		);
		const invites = await stmt.all(user.player_id);
		stmt.finalize();
		return invites;
	}
}

export const mdb = new Mdb(db);
