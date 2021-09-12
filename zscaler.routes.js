module.exports = app => {
  const computers = require("../controllers/zscaler.controller.js");

  var router = require("express").Router();

  // Create a new Computer
  router.post("/", computers.create);

  // Retrieve all Computers
  router.get("/", computers.findAll);

  // Retrieve a single Computer with id
  router.get("/:id", computers.findOne);

  // Update a Computer with id
  router.put("/:id", computers.update);

  // Delete a Computer with id
  router.delete("/:id", computers.delete);

  // delete a new Computer
  router.delete("/", computers.deleteAll);

  app.use('/api/computers', router);
};
