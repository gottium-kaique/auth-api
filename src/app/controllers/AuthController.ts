import User from "@models/User"
import jwt from "jsonwebtoken"
import secretKey from "@src/secretKey"

import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { compareSync } from "bcryptjs"

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body
    const repository = getRepository(User)

    const user = await repository.findOne({ where: {email} })

    if (!user) {
      return res.sendStatus(401)
    }

    const isValidPassword = compareSync(password, user.password)

    if (!isValidPassword) {
      return res.sendStatus(401)
    }

    const token = jwt
      .sign({ id: user.id }, secretKey.secretKey, {expiresIn: "30d"})
    
    delete (user as any).password

    return res.json({
      user,
      token,
    })
  }
}

export default new AuthController()