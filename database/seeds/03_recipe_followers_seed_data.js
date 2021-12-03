exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_recipes_follows')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user_recipes_follows').insert([
        { id: 1, user_id: '1', recipe_id: '2' },
        { id: 2, user_id: '2', recipe_id: '3' },
        { id: 3, user_id: '3', recipe_id: '1' },
      ]);
    });
};
