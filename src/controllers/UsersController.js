class UsersController {
  // Index - GET para lista vários registros
  // Show - GET para exibir um registro específico
  // Create - POST para criar um registro
  // Update - POST para atualizar um registro
  // Delete - DELETE para remover um registro

  create(request, response) {
    const { name, email, password } = request.body

    response.json({ name, email, password })
  }
}

module.exports = UsersController
