var User = null;

module.exports = function(bookshelf) {
  var Login = bookshelf.Model.extend({
    tableName: 'logins',
    hasTimestamps: ['created_at', 'updated_at'],
    user: function() {
      return this.belongsTo(User);
    }
  },
  {
    associate: function(models) {
      User = models.User;
    }
  });

  return Login;
}