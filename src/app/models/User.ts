import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  BeforeInsert, 
  BeforeUpdate,
  AfterUpdate,
} from "typeorm"

import { hashSync } from "bcryptjs"
import secretKey from "@src/secretKey"

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password, secretKey.salt)
  }
}

export default User