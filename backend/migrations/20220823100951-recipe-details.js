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
  return db.createTable('recipe_details', {
    id: {
      type: 'int',
      primaryKey: true,
      autoincrement: true,
      unique: true,
      notNull: true,
      unsigned: true
    },
    recipe_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'recipe_details_recipe_id_fk',
        table: 'recipe',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    measurement_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'recipe_details_measurement_id_fk',
        table: 'measurement_unit',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    measurement_qty_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'recipe_details_measurement_qty_id_fk',
        table: 'measurement_qty',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    ingredient_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'recipe_details_ingredient_id_fk',
        table: 'ingredient',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    recipe_tag_id: {
      type: 'int',
      unsigned: true,
      notNull: false,
      foreignKey: {
        name: 'recipe_details_recipe_tag_id_fk',
        table: 'recipe_tag',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    shopping_list_id: {
      type: 'int',
      unsigned: true,
      notNull: false,
      foreignKey: {
        name: 'recipe_details_shopping_list_id_fk',
        table: 'shopping_list',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });
};

exports.down = function (db) {
  return db.dropTable('recipe_details');
};

exports._meta = {
  'version': 1
};
