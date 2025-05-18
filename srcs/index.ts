import { mdb, Player } from './mdb.js';

// // TODO: test all functionalities
// console.log('TEST: test all functionalities');

// // TODO: add new players
// console.log('TEST: add new players');
// try {
// 	mdb.addPlayer('tarikkudesu', 'img.img');
// 	mdb.addPlayer('ooulcaid', 'img.img');
// 	mdb.addPlayer('omghazi', 'img.img');
// 	mdb.addPlayer('ezahiri', 'img.img');
// 	mdb.addPlayer('kol', 'img.img');
// 	mdb.addPlayer('klaus', 'img.img');
// 	mdb.addPlayer('elijah', 'img.img');
// 	mdb.addPlayer('rebekah', 'img.img');
// 	// TODO: duplicate player
// 	console.log('TEST: duplicate player');
// 	mdb.addPlayer('rebekah', 'img.img');
// } catch (err: any) {
// 	console.log('Error: ', err.message);
// }
// console.log(mdb.getAllPlayers());
// console.log('========================================================');

// // TODO: add invitations
// console.log('TEST: add invitations');
// try {
// 	mdb.createInvitation('tarikkudesu', 'ooulcaid');
// 	mdb.createInvitation('tarikkudesu', 'klaus');
// 	mdb.createInvitation('tarikkudesu', 'elijah');
// 	mdb.createInvitation('tarikkudesu', 'rebekah');
// 	mdb.createInvitation('tarikkudesu', 'ezahiri');
// 	mdb.createInvitation('tarikkudesu', 'omghazi');
// 	// TODO: duplicate invitation
// 	console.log('TEST: duplicate invitation');
// 	mdb.createInvitation('tarikkudesu', 'ooulcaid');
// } catch (err: any) {
// 	console.log('Error: ', err.message);
// }
// console.log(mdb.getAllPlayerInvitations('tarikkudesu'));
// console.log('========================================================');

// // TODO: cancel an invitation
// console.log('TEST: cancel an invitation');
// try {
// 	mdb.cancelInvitation('tarikkudesu', 'rebekah');
// } catch (err: any) {
// 	console.log('Error: ', err.message);
// }
// console.log(mdb.getAllPlayerInvitations('tarikkudesu'));
// console.log('========================================================');

// // TODO: accept an invitation
// console.log('TEST: accept an invitation');
// try {
// 	mdb.acceptInvitation('tarikkudesu', 'elijah');
// 	mdb.declineInvitation('tarikkudesu', 'elijah'); // already accepte, cannot be changed
// } catch (err: any) {
// 	console.log('Error: ', err.message);
// }
// console.log(mdb.getAllPlayerInvitations('tarikkudesu'));
// console.log('========================================================');

// // TODO: decline an invitation
// console.log('TEST: decline an invitation');
// try {
// 	mdb.declineInvitation('tarikkudesu', 'klaus');
// 	mdb.declineInvitation('tarikkudesu', 'omghazi');
// 	mdb.declineInvitation('tarikkudesu', 'ezahiri');
// } catch (err: any) {
// 	console.log('Error: ', err.message);
// }
// console.log(mdb.getAllPlayerInvitations('tarikkudesu'));
// console.log('========================================================');

// // TODO: delete a rejected invitation
// console.log('TEST: delete a rejected invitation');
// try {
// 	mdb.deleteRejectedInvitation('tarikkudesu', 'ezahiri');
// } catch (err: any) {
// 	console.log('Error: ', err.message);
// }
// console.log(mdb.getAllPlayerInvitations('tarikkudesu'));
// console.log('========================================================');

// // TODO: delete all rejected invitations
// console.log('TEST: delete all rejected invitations');
// try {
// 	mdb.deleteAllRejectedInvitations('tarikkudesu');
// } catch (err: any) {
// 	console.log('Error: ', err.message);
// }
// console.log(mdb.getAllPlayerInvitations('tarikkudesu'));
// console.log('========================================================');

// // TODO: get online players
// console.log('TEST: get online players');
// console.log(mdb.getAllOtherPlayersWithInviteStatus('tarikkudesu'));
// console.log('========================================================');

// // TODO: get user sent invitations
// console.log('TEST: get user sent invitations');
// console.log(mdb.getAllPlayerInvitations('tarikkudesu'));
// console.log('========================================================');

// // TODO: get all other online players
// console.log('TEST: get all other online players');
// console.log(mdb.getAllOtherPlayers('tarikkudesu'));
// console.log('========================================================');

// // TODO: get all other online players with invite status
// console.log('TEST: get all other online players with invite status');
// console.log(mdb.getAllOtherPlayersWithInviteStatus('tarikkudesu'));
// console.log('========================================================');

// // TODO: delete players
// console.log('TEST: delete players');
// mdb.removePlayer('tarikkudesu');
// mdb.removePlayer('ooulcaid');
// mdb.removePlayer('omghazi');
// mdb.removePlayer('ezahiri');
// console.log(mdb.getAllPlayers());
// mdb.removePlayer('kol');
// mdb.removePlayer('klaus');
// mdb.removePlayer('elijah');
// mdb.removePlayer('rebekah');
// console.log(mdb.getAllPlayers());

// console.log('========================================================');
// mdb.deleteAllInvitations();

// ! as of now all tests have been passed

// mdb.addPlayer('tarikkudesu', 'img.img');
// mdb.addPlayer('ooulcaid', 'img.img');
// mdb.addPlayer('omghazi', 'img.img');
// mdb.addPlayer('ezahiri', 'img.img');
// mdb.addPlayer('kol', 'img.img');
// mdb.addPlayer('klaus', 'img.img');
// mdb.addPlayer('elijah', 'img.img');
// mdb.addPlayer('rebekah', 'img.img');

// console.log(mdb.getAllPlayers());

// console.log(mdb.getAllOtherPlayers('tarikkudesu'));

// mdb.createInvitation('tarikkudesu', 'elijah');
// mdb.createInvitation('tarikkudesu', 'rebekah');
// mdb.createInvitation('tarikkudesu', 'klaus');
// mdb.createInvitation('tarikkudesu', 'ooulcaid');
// mdb.createInvitation('omghazi', 'ooulcaid');

// mdb.acceptInvitation('tarikkudesu', 'elijah');
// mdb.declineInvitation('tarikkudesu', 'klaus');

// console.log(mdb.getAllInvitations());
// mdb.cancelAllPlayerInvitations('tarikkudesu');
// console.log(mdb.getAllInvitations());

// setTimeout(() => {
// 	mdb.createInvitation('ooulcaid', 'tarikkudesu');
// 	mdb.deleteExpiredInvitations();
// }, 60000);
