module.exports = app => {
    const policies = require("../controllers/zscaler.controller.policy.js");
  
    var router = require("express").Router();
  
    // Create a new policy
    router.post("/", policies.create);
  
    // Retrieve all policys
    router.get("/", policies.findAll);
  
    // Retrieve all published policys
    router.get("/published", policies.findAllPublished);
  
    // Retrieve a single policy with id
    router.get("/:id", policies.findOne);
  
    // Update a policy with id
    router.put("/:id", policies.update);
  
    // Delete a policy with id
    router.delete("/:id", policies.delete);
  
    // delete a new policy
    router.delete("/", policies.deleteAll);
  
    app.use('/api/policies', router);
  };
  