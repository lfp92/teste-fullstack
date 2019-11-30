const mysql = require('mysql');

const pool = mysql.createPool({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME
});

let connect = (function () {
    let _this = this;
    return new Promise((resolve, reject) => {
        try {
            _this.getConnection((err, conn) => {
                if (err) reject(err);
                resolve(conn);
            });
        } catch (error) {
            reject(error);
        }
    });
}).bind(pool)

let query = function (sql, values) {
    let _this = this;
    return new Promise((resolve, reject) => {
        try {
            _this.query(sql, values, (err, results) => {
                if (err) reject(err);
                resolve(results);
            })
        } catch (error) {
            reject(error)
        }
    })
}

async function executeQuery(sql, params) {
    try {
        let conn = await connect();
        let results = await query.bind(conn)(sql, params);
        conn.release();
        return results;
    } catch (error) {
        throw error;
    }
}

module.exports = { executeQuery }