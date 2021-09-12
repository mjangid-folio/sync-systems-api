const db = require("../models");
const Computer = db.computers;
const Policy = db.policy
const Op = db.Sequelize.Op;
const crypto = require('crypto')
//when a row is added in computer table, add the respective mapping row into policy table also.

//4. to expose an endpoint to see the sync status - not required anymore as it will always be in sync
// Create and Save a new computer entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Computer entry
  const computer = {
    id: req.body.id,
    name: req.body.name,
    ip: req.body.ip,
    group_id: req.body.group_id,
  };

  // id: crypto.randomUUID({disableEntropyCache : true}),
  const policyUpdate = {
    id: req.body.id,
    computer_name: req.body.name,
    allowed_ip: req.body.ip,
    type: "computer_policy",
  };

  //       //create policy
  Policy.create(policyUpdate).then((data) => {
    console.log("create policy - done");
    // res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the computer.",
    });
  });
  // Save computer in the database
  Computer.create(computer)
    .then((data) => {
      console.log("create computer - done");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the computer.",
      });
    });
};

// Retrieve all computer from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Computer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving computer."
      });
    });
};

// Find a single computer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Computer.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving computer with id=" + id
      });
    });
};

// Update a computer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Computer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "computer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update computer with id=${id}. Maybe computer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating computer with id=" + id
      });
    });
};

// Delete a computer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Computer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "computer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete computer with id=${id}. Maybe computer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete computer with id=" + id
      });
    });
};

// Delete all computer from the database.
exports.deleteAll = (req, res) => {
  Computer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} computer were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all computer."
      });
    });
};

// Find all published computer
exports.findAllPublished = (req, res) => {
  Computer.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving computer."
      });
    });
};
