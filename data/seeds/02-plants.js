exports.seed = function (knex) {
  return knex("plants")
    .truncate()
    .then(function () {
      return knex("plants").insert([
        {
          id: 1,
          nickname: "rich",
          species: "money tree",
          h2oFrequency: "daily",
          user_id: 3,
        },
        {
          id: 2,
          nickname: "treebeard",
          species: "ent",
          h2oFrequency: "weekly",
          user_id: 1,
        },
        {
          id: 3,
          nickname: "yggdrasill",
          species: "world tree",
          h2oFrequency: "bi-millennial",
          user_id: 2,
        },
      ]);
    });
};
