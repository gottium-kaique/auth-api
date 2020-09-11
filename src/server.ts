import express from "express"
import cors from "cors"
import routes from "./routes"

import "reflect-metadata"
import "@database/connect"

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})