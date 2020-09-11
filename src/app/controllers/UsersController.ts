import User from "@models/User"

import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { compareSync } from "bcryptjs"

class UsersControllers {
  indexUserId({ userId }: Request, res: Response) {
    return res.send({id: userId})
  }
  
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body
    const repository = getRepository(User)

    const userAlreadyExists = await repository.findOne({where: {email}})

    if (userAlreadyExists) {
      return res.sendStatus(409)
    }

    if (String(password).length < 8) {
      return res.status(401).send("Short password!")
    }

    const user = repository.create({ name, email, password })
    await repository.save(user)

    return res.send("User was created!")
  }

  async delete(req: Request, res: Response) {
    const { email, password } = req.body
    const repository = getRepository(User)

    const user = await repository
      .findOne({where: {email}})

    if (!user) {
      return res.status(400).send("User doesn´t exists!")
    }
        
    if (compareSync(password, user.password)) {
      const deletedUser = await repository.delete({...user})
      return res.send("User was deleted!")
    }

    return res.sendStatus(401)
  }

  async index(req: Request, res: Response) {
    const { email } = req.params

    const repository = getRepository(User)
    const user = await repository.findOne({where: {email}})

    delete (user as any)?.password

    if (user) {
      return res.json(user)
    }

    return res.send("User was not found!").status(200)
  }

  async update(req: Request, res: Response) {
    let {
      userEmail,
      userPassword,
      name,
      email,
      password,
    } = req.body

    const repository = getRepository(User)
    const user = await repository.findOne({where: {email: userEmail}})
    const userAlreadyExists = await repository.find({where: {email}})
  
    if (userAlreadyExists.length > 1) {
      return res.sendStatus(409)
    }
    
    if (!user) {
      return res.status(401).send("Email is incorrect!")
    }

    if (password.length < 8) {
      return res.status(401).send("Short password!")
    }

    if (compareSync(userPassword, user.password)) {
      let dataForUpdate = [
        {column: "name", value: name},
        {column: "email", value: email},
        {column: "password", value: password},
      ]

      dataForUpdate = dataForUpdate.filter(data => !!data.value)
      let dataForUpdateObject: any = {}

      dataForUpdate.map(data => {
        dataForUpdateObject[data.column] = data.value
      })

      console.log(dataForUpdate)

      const updatedUser = repository.merge(user, dataForUpdateObject)

      await repository.save(updatedUser)

      return res.send("Updated user!")
    }

    return res.send("Password is incorrect!")
  }
}

export default new UsersControllers()