'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('user', {
    id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      notNull: true,
      autoIncrement: true,
      unique: true
    },
    first_name: { type: 'string', length: 44, notNull: true },
    last_name: { type: 'string', length: 40, notNull: true },
    email: { type: 'string', length: 64, notNull: true, unique: true },
    password: { type: 'string', length: 64, notNull: true }
  });
};

exports.down = function (db) {
  return db.dropTable('user');
};

exports._meta = {
  'version': 1
};
