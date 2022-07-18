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
  return db.createTable('recipe_tag', {
    tag_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      notNull: true,
      autoIncrement: true,
      unique: true
    },
    recipe_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'recipe_tag_recipe_id_fk',
        table: 'recipe',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'recipe_id'
      }
    },
    tag: {
      type: 'string',
      length: 64,
      notNull: true
    }
  });
};

exports.down = function (db) {
  return db.dropTable('recipe_tag');
};

exports._meta = {
  'version': 1
};
