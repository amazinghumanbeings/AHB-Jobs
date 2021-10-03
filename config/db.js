var mysql = require('mysql2');
var connection = mysql.createPool(
    {   
        port: 3308,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ahbjobs'
    }
)

module.exports = connection;