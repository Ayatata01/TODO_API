const Task = require("../models/task");
const User = require("../models/user");

Task.sync();
exports.GET = async (req, res) => {
  const user_id = await User.findOne({
    where: {
      email: req.user.email,
    },
  });

  const data = await Task.findAll({
    where: {
      id_user: user_id.id,
    },
  });

  if (data) {
    res.status(200).json({
      data,
    });
  } else {
    res.status(200).json({
      message: "there is no task",
    });
  }
};

exports.CREATE = async (req, res) => {
  const nama_tugas = req.body.nama_tugas;
  const status = req.body.status;
  const email = req.user.email;

  const user_id = await User.findOne({
    where: {
      email: email,
    },
  });

  const data = {
    nama_tugas: nama_tugas,
    status: status,
    id_user: user_id.id,
  };

  Task.create(data)
    .then((result) => {
      res.status(201).json({
        result,
      });
    })
    .catch((err) => res.json({ err }));
};

exports.EDIT = async (req, res) => {
  const nama_tugas = req.body.nama_tugas;
  const status = req.body.status;
  const email = req.user.email;
  const id = req.params.id;

  const user_id = await User.findOne({
    where: {
      email: email,
    },
  });

  const data = {
    nama_tugas: nama_tugas,
    status: status,
    id_user: user_id.id,
  };

  Task.update(data, {
    where: {
      id: id,
      id_user: user_id.id,
    },
  })
    .then((result) => {
      res.status(201).json({ data });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.DELETE = async (req, res) => {
  const id = req.params.id;

  const user_id = await User.findOne({
    where: {
      email: req.user.email,
    },
  });

  Task.destroy({
    where: {
      id: id,
      id_user: user_id.id,
    },
  })
    .then(() => res.json({ message: "Task deleted" }))
    .catch((error) => res.json({ error }));
};
