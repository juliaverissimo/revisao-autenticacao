import { clear } from "node:console";
import { Pool }  from pg;
import "dotenv/config"; 

const pool = new  pool({
    connectionstring: process.env.DATABASE_url,

});

pool.on("error", (err) => {
    console.error("erro em cliente ocioso:", err);
});

export {pool};