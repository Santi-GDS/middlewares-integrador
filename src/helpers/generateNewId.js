const fs = require('fs');
const path = require('path');  
const getAllUsers = require('./getAllUsers'); 
    
    function generateNewId(){
        const users = getAllUsers();
        return users.pop().id + 1;
    }

    module.exports = generateNewId;

    