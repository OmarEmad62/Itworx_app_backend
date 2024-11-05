import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host,
    port: process.env.db_port,
    dialect: "mysql",
});

export{sequelize};