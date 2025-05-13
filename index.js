import { mdb } from './srcs/index.js';

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO: test all functionalities

// TODO: add new players
try {
	await mdb.addPlayer('tarikkudesu', 'img.img');
	await mdb.addPlayer('ooulcaid', 'img.img');
	await mdb.addPlayer('omghazi', 'img.img');
	await mdb.addPlayer('ezahiri', 'img.img');
	await mdb.addPlayer('kol', 'img.img');
	await mdb.addPlayer('klaus', 'img.img');
	await mdb.addPlayer('elijah', 'img.img');
	await mdb.addPlayer('rebekah', 'img.img');
	// TODO: duplicate player
	await mdb.addPlayer('rebekah', 'img.img');
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getAllPlayers());
console.log('========================================================');

// TODO: add invitations
try {
	await mdb.createInvitation('tarikkudesu', 'ooulcaid');
	await mdb.createInvitation('tarikkudesu', 'klaus');
	await mdb.createInvitation('tarikkudesu', 'elijah');
	await mdb.createInvitation('tarikkudesu', 'rebekah');
	await mdb.createInvitation('tarikkudesu', 'ezahiri');
	await mdb.createInvitation('tarikkudesu', 'omghazi');
	// TODO: duplicate invitation
	await mdb.createInvitation('tarikkudesu', 'ooulcaid');
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getUserSentInvitations('tarikkudesu'));
console.log('========================================================');

// TODO: cancel an invitation
try {
	await mdb.cancelInvitation('tarikkudesu', 'rebekah');
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getUserSentInvitations('tarikkudesu'));
console.log('========================================================');

// TODO: accept an invitation
try {
	await mdb.acceptInvitation('tarikkudesu', 'elijah');
	await mdb.declineInvitation('tarikkudesu', 'elijah'); // already accepte, cannot be changed
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getUserSentInvitations('tarikkudesu'));
console.log('========================================================');

// TODO: decline an invitation
try {
	await mdb.declineInvitation('tarikkudesu', 'klaus');
	await mdb.declineInvitation('tarikkudesu', 'omghazi');
	await mdb.declineInvitation('tarikkudesu', 'ezahiri');
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getUserSentInvitations('tarikkudesu'));
console.log('========================================================');

// TODO: delete a rejected invitation
try {
	await mdb.deleteRejectedInvitation('tarikkudesu', 'ezahiri');
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getUserSentInvitations('tarikkudesu'));
console.log('========================================================');

// TODO: delete all rejected invitations
try {
	await mdb.deleteAllRejectedInvitation('tarikkudesu');
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getUserSentInvitations('tarikkudesu'));
console.log('========================================================');

// TODO: update expired invitations
try {
	await wait(61000);
	await mdb.updateExpiredInvitations();
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getUserSentInvitations('tarikkudesu'));
console.log('========================================================');

// TODO: delete to be deleted invitations
try {
	await wait(61000);
	await mdb.deleteToBeDeletedInvitations();
} catch (err) {
	console.log('pass: ', err.message);
}
console.log(await mdb.getUserSentInvitations('tarikkudesu'));
console.log('========================================================');

// TODO: get online players
console.log(await mdb.getAllOtherPlayersWithInviteStatus('tarikkudesu'));
console.log('========================================================');

// TODO: get user sent invitations
console.log(await mdb.getAllOtherPlayersWithInviteStatus('ooulcaid'));
console.log('========================================================');

// TODO: delete players
await mdb.removePlayer('tarikkudesu');
await mdb.removePlayer('ooulcaid');
await mdb.removePlayer('omghazi');
await mdb.removePlayer('ezahiri');
await mdb.removePlayer('kol');
await mdb.removePlayer('klaus');
await mdb.removePlayer('elijah');
await mdb.removePlayer('rebekah');

console.log(await mdb.getAllPlayers());
console.log('========================================================');

// ! as of now all tests have been passed
