import Sequelize from "sequelize";

export const sequelize = new Sequelize("postgres", "postgres", "CRM1010?", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log,
});
