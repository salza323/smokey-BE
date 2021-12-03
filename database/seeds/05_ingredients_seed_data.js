exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ingredients')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {
          id: 1,
          recipe_id: '1',
          ingredient_name: 'Pork Shoulder, bone in with 1/4" fat cap.',
          ingredient_quantity: '10-13 lbs',
        },
        {
          id: 2,
          recipe_id: '1',
          ingredient_name: 'Kosher Salt',
          ingredient_quantity: '6 tbs',
        },
        {
          id: 3,
          recipe_id: '1',
          ingredient_name: '16 mesh caf round black pepper',
          ingredient_quantity: '6 tbs',
        },
        {
          id: 4,
          recipe_id: '2',
          ingredient_name: 'Packer Cut, Whole Brisket',
          ingredient_quantity: '10-12 lbs',
        },
        {
          id: 5,
          recipe_id: '2',
          ingredient_name: 'Kosher Sal',
          ingredient_quantity: '10 tbs',
        },
        {
          id: 6,
          recipe_id: '2',
          ingredient_name: '16 mesh caf round black pepper',
          ingredient_quantity: '10 tbs',
        },
        {
          id: 7,
          recipe_id: '3',
          ingredient_name: 'Sirloin Tri trip',
          ingredient_quantity: '5-6 lbs',
        },
        {
          id: 8,
          recipe_id: '3',
          ingredient_name: 'Kosher Sal',
          ingredient_quantity: '5 tbs',
        },
        {
          id: 9,
          recipe_id: '3',
          ingredient_name: '16 mesh caf round black pepper',
          ingredient_quantity: '5tbs',
        },
      ]);
    });
};
