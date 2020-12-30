const fs = require('fs');
const path = require('path');
const getAllUsers = require('./getAllUsers');
const file = path.join(__dirname, '../database/users.json');

function writeUser(user) {
	const users = getAllUsers();
	const usersToSave = [...users, user];
	const userToJson = JSON.stringify(usersToSave, null, " ");
	fs.writeFileSync(file, userToJson);
}

module.exports = writeUser;
