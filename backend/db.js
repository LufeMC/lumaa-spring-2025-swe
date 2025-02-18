import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "TaskManagement",
    password: "Vish@1909",
    port: 5432,
});

db.connect();

export default db;