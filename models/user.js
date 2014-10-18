var Package = null;

module.exports = function(bookshelf) {
  var User = bookshelf.Model.extend({
    tableName: 'users',
    package: function() {
      return this.hasMany(Package);
    }
  },
  {
    associate: function(models) {
      Package = models.Package;
    }
  });

  return User;
}