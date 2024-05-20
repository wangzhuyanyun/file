"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: '116.62.38.196',
    user: 'mysql1',
    password: 'factor@06W!',
    database: 'mysql1'
});
db.connect(error => {
    if (error)
        throw error;
    console.log('Successfully connected to the database.');
});
exports.default = db;
//# sourceMappingURL=db.js.map