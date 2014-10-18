var User = null;

module.exports = function(bookshelf) {
  var Package = bookshelf.Model.extend({
    tableName: 'packages',
    user: function() {
      return this.belongsTo(User);
    }
  },
  {
    associate: function(models) {
      User = models.User;
    }
  });

  return Package;
}