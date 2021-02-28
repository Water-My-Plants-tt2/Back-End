# Back-End

## Heroku

https://greenthumbs-tt2.herokuapp.com/

|          |                        |                                                                                    |
| -------- | ---------------------- | ---------------------------------------------------------------------------------- |
| **POST** | _/api/auth/register_   | Register new user. username, password, and phone_number required                   |
| **POST** | _/api/auth/login_      | login, username and password required - returns token                              |
| **PUT**  | _/api/auth/:id/update_ | update password and phone number - password, phone_number, and valid token required |
| **GET**  | _/api/users_           | List of all users                                                                  |
| **GET**  | _/api/users/:id_       | Shows user with given id                                                           |
