exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'mpitman@meatchurch.com',
          username: 'Meato Bandito',
          password: 'Testpassword1',
          fav_cooker: 'Ironwood 885',
          city_and_state_location: 'Waxahatchie, TX',
        },
        {
          id: 2,
          email: 'sbulloch@heygrillhey.com',
          username: 'SusieQ',
          password: 'Testpassword1',
          fav_cooker: 'CampChef Smokepro LUX',
          city_and_state_location: 'SLC, Utah',
        },
        {
          id: 3,
          email: 'mreed@killerhogs.com',
          username: 'The BBQ Man',
          password: 'Testpassword1',
          fav_cooker: 'PK New Original',
          city_and_state_location: 'Hernando, Mississippi',
        },
      ]);
    });
};
