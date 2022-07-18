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
  return db.createTable('recipe', {
    recipe_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      notNull: true,
      autoIncrement: true,
      unique: true
    },
    recipe_name: { type: 'string', length: 64, notNull: true },
    description: { type: 'string', notNull: true },
    image_id: { type: 'string', notNull: true }
  });
};

exports.down = function (db) {
  return db.dropTable('recipe');
};

exports._meta = {
  'version': 1
};
