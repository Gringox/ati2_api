'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email').unique();
    table.string('password').notNull();
    table.string('name').notNull();
    table.string('lastname').notNull();
  })
  .createTable('packages', function(table) {
    table.increments();
    table.string('name').notNull();
    table.integer('user_id').references('users.id');
  });
};

exports.down = function(knex, Promise) {
  
};
