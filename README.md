README
======

NEEDED
======
node.js, npm, postgresql

A database named ati2 with user and password 'ati2' must be setup.

RUN
===
```
npm install
npm install -g knex
knex migrate:latest
npm start
```

Note: there's a insert.sql in the seeds folder with some data you can copy/paste

Try GET users/1

Greets!
