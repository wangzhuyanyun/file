
const mysql= require("mysql2");
const db = mysql.createConnection({
    host: '116.62.38.196',
    user: 'mysql1',
    password: 'factor@06W!',
    database: 'mysql1'
});

db.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

// �����ѯ����
//db.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
//    if (error) throw error;
//    console.log('The solution is: ', results[0].solution);
//});

// �ر�����
//db.end();
export default db;