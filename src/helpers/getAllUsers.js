const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/users.json');

function getAllUsers(){
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));      
}

module.exports = getAllUsers;