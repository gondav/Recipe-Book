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
  return db.createTable('measurement_unit', {
    measurement_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      notNull: true,
      autoIncrement: true,
      unique: true
    },
    measurement_description: {
      type: 'string',
      length: 32,
      notNull: true
    }
  });
};

exports.down = function (db) {
  return db.dropTable('measurement_unit');
};

exports._meta = {
  'version': 1
};
