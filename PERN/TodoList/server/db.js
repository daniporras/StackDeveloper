const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
   // password: "",
   password: "postgres",
    //host: "localhost",
    host: "192.168.1.107",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;