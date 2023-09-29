const express = require("express")
const routes = require("./routes")

const app = express()
app.use(express.json())

app.use(routes)

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
