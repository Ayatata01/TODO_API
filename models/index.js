const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("todo_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connection to database is successful");
  })
  .catch((err) => console.log(err));

module.exports = sequelize;
