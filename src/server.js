require("express-async-errors")
const database = require("./database/sqlite")
const express = require("express")
const routes = require("./routes")
const AppError = require("./utils/AppError")


const app = express()
app.use(express.json())

app.use(routes)

database()

app.use((error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.status).json({
      status:"error",
      message:error.message
    });
  }
  console.log(error)
  return response.status(500).json({
    status:"error",
      message:"Internal Server error"
  })
})

const PORT = 3333

app.get("/", (request, response) => {
  response.send("TomePromo API2")
})

app.get("/promo/:id", (request, response) => {
  const { id, user } = request.params

  response.send(`Message ${id}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
