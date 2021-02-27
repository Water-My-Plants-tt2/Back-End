exports.seed = function (knex) {
  return knex('users').then(function () {
    return knex('users').insert([
      {
        username: 'Tommy Tutone',
        password: 'comebackjenny',
        phone_number: 3248675392,
      },
      {
        username: 'Rick Astley',
        password: 'neverletyoudown',
        phone_number: 9824345508,
      },
      {
        username: 'Vanilla Ice',
        password: 'i<3chocolate',
        phone_number: 8721357988,
      },
    ]);
  });
};
