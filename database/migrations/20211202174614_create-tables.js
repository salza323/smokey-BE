exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments();
      tbl.string('email', 128).notNullable().unique();
      tbl.string('username', 128).notNullable().unique().index();
      tbl.string('password', 128).notNullable();
      tbl.string('fav_cooker', 128);
      tbl.string('city_and_state_location', 128);
    })

    .createTable('recipes', (tbl) => {
      tbl.increments();
      tbl.string('recipe_name', 128).notNullable();
      tbl
        .integer('ingredients')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('ingredients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('creator_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('likes');
    })
    .createTable('user_recipes_follows', (tbl) => {
      tbl.increments();
      tbl
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('recipe_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('steps', (tbl) => {
      tbl.increments();
      tbl
        .integer('recipe_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('step_number').notNullable();
      tbl.integer('step_temperature_in_fahrenheit').notNullable();
      tbl.string('step_instruction').notNullable();
    })
    .createTable('ingredients', (tbl) => {
      tbl.increments();
      tbl
        .integer('recipe_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.string('ingredient_name').notNullable();
      tbl.string('ingredient_quantity').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('user_recipes_follows')
    .dropTableIfExists('recipes')
    .dropTableIfExists('users');
};
