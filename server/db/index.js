import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const poolOptions = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDB,
    password: process.env.PGPASS,
};
class Db {
    constructor() {
        this.pool = new Pool(poolOptions);
        this.connect = async () => this.pool.connect();

        this.usersTable = `
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(30) UNIQUE,
    password VARCHAR(30) NOT NULL,
    createdOn DATE NOT NULL
)
    `;

        this.messagesTable = `
  CREATE TABLE IF NOT EXISTS messages(
      id SERIAL PRIMARY KEY,
      senderID SERIAL REFERENCES users(id) ON DELETE CASCADE,
      receiverId SERIAL NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      parentMessageId UUID,
      status VARCHAR(20) NOT NULL,
      createdOn DATE NOT NULL
  )
`;

        this.groupsTable = `
   CREATE TABLE IF NOT EXISTS groups(
       id SERIAL PRIMARY KEY,
       name VARCHAR(30) NOT NULL,
       createdBy SERIAL REFERENCES users(id) ON DELETE CASCADE,
       createdOn DATE NOT NULL
   )
`;
        this.groupMembersTable = `
   CREATE TABLE IF NOT EXISTS group_members(
       id SERIAL PRIMARY KEY,
       groupId SERIAL REFERENCES groups(id) ON DELETE CASCADE,
       memberId SERIAL REFERENCES users(id) ON DELETE CASCADE,
       role VARCHAR(20) NOT NULL
   )
`; this.groupMessagesTable = `
    CREATE TABLE IF NOT EXISTS group_messages(
        id SERIAL PRIMARY KEY,
        senderId SERIAL REFERENCES users(id) ON DELETE CASCADE,
        groupId SERIAL REFERENCES groups(id) ON DELETE CASCADE,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        parentMessageId INTEGER,
        status VARCHAR(20) NOT NULL,
        createdOn DATE NOT NULL
    )
`;
        this.initDb();
    }


    async query(sql, data = []) {
        const conn = await this.connect();
        try {
            if (data.length) {
                return await conn.query(sql, data);
            }
            return await conn.query(sql);
        } catch (err) {
            return err;
        } finally {
            conn.release();
        }
    }

    async initDb() {
        await this.query(this.groupMembersTable);
        await this.query(this.groupMessagesTable);
        await this.query(this.messagesTable);
        await this.query(this.groupsTable);
        await this.query(this.usersTable);
        console.log("Tables are created");
    }
}


export default new Db();
