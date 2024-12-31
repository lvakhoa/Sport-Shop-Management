import { IUser } from '../users'

export interface ISession {
  id: string
  user_id: string
  user: IUser
}
