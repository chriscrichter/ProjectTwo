var express = require('express');
var db = require("../models");
var router = express.Router();

router.get("/api/posts/", function(req, res) {
  db.Post.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

router.post("/api/posts", function(req, res) {
  console.log(req.body);
  db.Post.create(req.body)
    .then(function(dbPost) {
      res.json(dbPost);
    });
});

router.delete("/api/posts/:id", function(req, res) {
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function(dbPost){
    res.json(dbPost); 
  });
})

router.get("/api.posts", function(req, res){
  var query = {};
  if (req.query.user_id) {
    query.UserId = req.query.user_id
  }
  db.Post.findAll({
    where: query,
    include: [db.User]
  }).then(res.json);
});

router.put("/api/posts", function(req, res){
  const query = {
    where: {
      id:  req.body.id
    }
  };
  db.Post.update(req.body, query).then(res.json);
});

module.exports = router