import { 
  Request, 
  Response, 
  NextFunction 
} from "express"

import jwt from "jsonwebtoken"
import secretKey from "@src/secretKey"

interface TokenPayLoad {
  id: number
  iat: number
  exp: number
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.sendStatus(401)
  }

  const token = authorization.replace("Bearer", "").trim()

  try {
    const data = jwt.verify(token, secretKey.secretKey) as TokenPayLoad
    const { id } = data

    req.userId = id

    return next()
  } catch {
    return res.sendStatus(401)
  }
}

export default authMiddleware