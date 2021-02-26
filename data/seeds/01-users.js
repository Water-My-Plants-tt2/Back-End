exports.seed = function (knex) {
  return knex("users").then(function () {
    return knex("users").insert([
      {
        user_id: 1,
        username: "Tommy Tutone",
        password: "comebackjenny",
        phone_number: 8675309,
      },
      {
        user_id: 2,
        username: "Rick Astley",
        password: "neverletyoudown",
        phone_number: 4345508,
      },
      {
        user_id: 3,
        username: "Vanilla Ice",
        password: "i<3chocolate",
        phone_number: 1357988,
      },
    ]);
  });
};
