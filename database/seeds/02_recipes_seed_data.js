exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('recipes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { id: 1, recipe_name: 'Pork Butt', creator_id: '3', likes: '22' },
        { id: 2, recipe_name: 'Brisket', creator_id: '1', likes: '55' },
        { id: 3, recipe_name: 'Smoked Tri-Tip', creator_id: '2', likes: '21' },
        {
          id: 4,
          recipe_name: 'Country Style Ribs',
          creator_id: '1',
          likes: '29',
        },
      ]);
    });
};
