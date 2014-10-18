module.exports = {
  create: function(req, res) {
    req.app.locals.models.User
    .forge(req.body)
    .save(null, {method: 'insert'})
    .then(function(user) {
      res.status(201).json(user);
    })
    .otherwise(function() {
      res.status(409).send();
    });
  },
  read: function(req, res) {
    req.app.locals.models.User
    .forge({
      id: req.param('id')
    })
    .fetch({
      withRelated: [
        'package'
      ]
    })
    .then(function(user){
      if (user)
        res.json(user);
      else
        res.status(404).send();
    })
    .otherwise(function() {
      res.status(400).send();
    });
  },
  readAll: function(req, res) {
    req.app.locals.models.User
    .forge()
    .fetchAll()
    .then(function(users) {
      if (users.length)
        res.json(users);
      else
        res.status(404).send();
    });
  },
  update: function(req, res) {
    req.app.locals.models.User
    .forge({
      id: req.param('id')
    })
    .fetch()
    .then(function(user){
      if (user)
        user.save(req.body, {patch: true, method: 'update'})
        .then(function() {
          res.status(204).send();
        })
        .otherwise(function() {
          res.status(409).send();
        });
      else
        res.status(404).send();
    })
    .otherwise(function() {
      res.status(400).send();
    });
  },
  delete: function(req, res) {
    req.app.locals.models.User
    .forge({
      id: req.param('id')
    })
    .fetch()
    .then(function(user){
      if (user)
        user.destroy()
        .then(function() {
          res.status(204).send();
        })
        .otherwise(function() {
          res.status(409).send();
        });
      else
        res.status(404).send();
    })
    .otherwise(function() {
      res.status(400).send();
    });
  },
  options: function(req, res) {
    res.set('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    res.json({
      name: "Users",
      description: "User CRUD",
      renders: "application/json",
      parses: [
        "application/json", 
        "application/x-www-form-urlencoded", 
        "multipart/form-data"
      ]
    });
  }
};