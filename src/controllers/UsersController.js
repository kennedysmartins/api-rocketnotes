const {hash, compare} = require("bcrypt")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite");

class UsersController {
  // Index - GET para lista vários registros
  // Show - GET para exibir um registro específico
  // Create - POST para criar um registro
  // Update - POST para atualizar um registro
  // Delete - DELETE para remover um registro

  async create(request, response) {
    const { name, email, password } = request.body
    
    const database = await sqliteConnection();
    const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExist) {
      throw new AppError("User already exists");
  }
  const hashedPassword = await hash(password, 8)
  await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])
  return response.status(201).json();
}

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user.id]);

    if (!user) {
      throw new AppError("User not found");
    }

    const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    if (userWithUpdateEmail && userWithUpdateEmail.id !== id) {
      throw new AppError("This email already exists in the database");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError("You need inform old password")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password,user.password);
      if(!checkOldPassword) {
        throw new AppError("Old password is incorrect");
      }
      user.password = await hash(password, 8)
    }

    await database.run(`
    UPDATE users SET
    name =?,
    email =?,
    password =?,
    updated_at = DATETIME("now")
    WHERE id =?`, [user.name, user.email, user.password, id]);


    return response.json();


  }


}

module.exports = UsersController
