var UserDB = require("../Model/Model");

//Create and save new user
exports.create = (req, res) => {
  //validate request

  if (!req.body) {
    res.status(400).send({ message: "Content can't be empty" });
    return;
  }

  //new user

  const user = new UserDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in the DB

  user
    .save(user)
    .then((data) => {
      //res.send(data);
      res.redirect('/add-user')
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured during this operation",
      });
    });
};

//retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    UserDB.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving user with id" + id });
      });
  } else {
    UserDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured during this operation",
        });
      });
  }
};

//Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Can't update empty data",
    });
  }
  const id = req.params.id;
  UserDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}, Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error occured during this operation" });
    });
};

//Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserDB.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with ${id}, Maybe user not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};
