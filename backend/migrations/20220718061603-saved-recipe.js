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
  return db.createTable('saved_recipe', {
    id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      notNull: true,
      autoIncrement: true,
      unique: true
    },
    user_id: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        name: 'saved_recipe_user_id_fk',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    recipe_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'saved_recipe_recipe_id_fk',
        table: 'recipe',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'recipe_id'
      }
    }
  });
};

exports.down = function (db) {
  return db.dropTable('saved_recipe');
};

exports._meta = {
  'version': 1
};
