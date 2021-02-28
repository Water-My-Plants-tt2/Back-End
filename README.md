# Back-End

## Heroku

https://greenthumbs-tt2.herokuapp.com/

| Auth        |                        |                                                                                                                               |
| ----------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ------      | ------                 | ------                                                                                                                        |
| **POST**    | _/api/auth/register_   | Register new user - username, password, and phone_number required                                                             |
| **POST**    | _/api/auth/login_      | Login - username and password required - returns token                                                                        |
| **PUT**     | _/api/auth/:id/update_ | Update user password and phone number for the given user_id - password, phone_number, valid user_id, and valid token required |
| ------      | ------                 | ------                                                                                                                        |
| **Users**   |                        |                                                                                                                               |
| **GET**     | _/api/users_           | List of all users                                                                                                             |
| **GET**     | _/api/users/:id_       | User info for the given user_id                                                                                               |
| ------      | ------                 | ------                                                                                                                        |
| **Plants ** |                        |                                                                                                                               |
| **GET**     | _/api/plants/:id_      | List of a users plants for the given user_id                                                                                  |
| **POST**    | _/api/plants/:id_      | Adds a plant to a user with the given user_id - nickname, species, h2oFrequency, and valid token required                     |
| **PUT**     | _/api/plants/:id_      | Updates a plant at the given plant_id - nickname, species, h2oFrequency, and valid token required                             |
| **DELETE**  | _/api/plants/:id_      | Deletes a plant at the given plant_id                                                                                         |
