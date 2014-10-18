module.exports = {
  create: function(req, res) {
    req.app.locals.models.Package
    .forge(req.body)
    .save(null, {method: 'insert'})
    .then(function(_package) {
      res.status(201).json(_package);
    })
    .otherwise(function() {
      res.status(409).send();
    });
  },
  read: function(req, res) {
    req.app.locals.models.Package
    .forge({
      id: req.param('id')
    })
    .fetch()
    .then(function(_package){
      if (_package)
        res.json(_package);
      else
        res.status(404).send();
    })
    .otherwise(function() {
      res.status(400).send();
    });
  },
  readAll: function(req, res) {
    req.app.locals.models.Package
    .forge()
    .fetchAll()
    .then(function(_packages) {
      if (_packages.length)
        res.json(_packages);
      else
        res.status(404).send();
    });
  },
  update: function(req, res) {
    req.app.locals.models.Package
    .forge({
      id: req.param('id')
    })
    .fetch()
    .then(function(_package){
      if (_package)
        _package.save(req.body, {patch: true, method: 'update'})
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
    req.app.locals.models.Package
    .forge({
      id: req.param('id')
    })
    .fetch()
    .then(function(_package){
      if (_package)
        _package.destroy()
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
      name: "Packages",
      description: "Package CRUD",
      renders: "application/json",
      parses: [
        "application/json", 
        "application/x-www-form-urlencoded", 
        "multipart/form-data"
      ]
    });
  }
};