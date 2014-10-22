var randtoken = require('rand-token'),
    crypto = require('crypto');

module.exports = {
  create: function(req, res) {
    req.app.locals.models.User
    .forge({
      email: req.param('email')
    })
    .fetch()
    .then(function(user){
      if (user)
        if (user.get('password') === crypto.createHash('md5').update(req.body.password).digest('hex')) {
          var token = user.get('email').toString().concat('_').concat(randtoken.generate(64));
          req.app.locals.models.Login
          .forge({
            id: user.get('id'),
            login_token: token,
            created_at: new Date()
          })
          .save(null, { method: 'insert' })
          .then(function(login){
            res.status(201).json(login);
          })
          .otherwise(function(){
            res.status(409).json({ error: 'User already logged or something else went wrong' });
          });
        }
        else
          res.status(403).json({ error: 'Wrong password' });
      else
        res.status(404).send();
    })
    .otherwise(function(error) {
      res.status(400).send();
    });
  },
  delete: function(req, res) {
    console.log(req.param('login_token'));
    req.app.locals.models.Login
    .forge({
      login_token: req.param('login_token')
    })
    .fetch()
    .then(function(login){
      if (login)
        login.destroy()
        .then(function(){
          res.status(204).send();
        })
        .otherwise(function(){
          res.status(409).send();
        });
      else
        res.status(404).json({ error: 'User not logged in' });
      })
      .otherwise(function(){
        res.status(400).send();
      });
  },
  validate: function(req, res, next) {
    if (req.get('Token')) {
      req.app.locals.models.Login
      .forge({
        login_token: req.get('Token')
      })
      .fetch()
      .then(function(login) {
        if (login)
          return next();
        else
          res.status(404).json({ error: 'User does not exists or login not found' });
      })
      .otherwise(function() {
        res.status(400).send();
      });
    }
    else {
      res.status(400).json({ error: 'Login token not found' });
      return;
    }
  },
  options: function(req, res) {
    res.set('Allow', 'POST, DELETE, OPTIONS');
    res.json({
      name: "Login",
      description: "Allows user login",
      renders: "application/json",
      parses: [
        "application/json", 
        "application/x-www-form-urlencoded", 
        "multipart/form-data"
      ]
    });
  }
};