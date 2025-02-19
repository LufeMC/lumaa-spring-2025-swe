import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "TaskManagement",
    password: "Vish@1909",
    port: 5432,
});

db.connect();

const createUserTable = () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    )`;

    db.query(queryText)
        .then(res => {
            console.log("User table created successfully");
        })
        .catch(err => {
            console.error("Error creating user table", err.stack);
        });
};

const createTodoListTable = () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS todolist (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        email VARCHAR(100) REFERENCES users(email) ON DELETE CASCADE
    )`;

    db.query(queryText)
        .then(res => {
            console.log("TodoList table created successfully");
        })
        .catch(err => {
            console.error("Error creating todolist table", err.stack);
        });
};

createUserTable();
createTodoListTable();

export default db;