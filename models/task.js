const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./user"); // Import model user

const Task = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_tugas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Menambahkan relasi hasMany pada model User
User.hasMany(Task, {
  foreignKey: {
    name: "id_user", // Nama kolom foreign key pada tabel "tasks"
    allowNull: false,
  },
  onDelete: "CASCADE",
});

// Menambahkan relasi belongsTo pada model Task
Task.belongsTo(User, {
  foreignKey: {
    name: "id_user", // Nama kolom foreign key pada tabel "tasks"
    allowNull: false,
  },
});

module.exports = Task;
