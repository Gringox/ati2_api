'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('logins', function(table) {
    table.integer('id').primary().references('users.id');
    table.string('login_token').defaultTo('empty');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  
};
