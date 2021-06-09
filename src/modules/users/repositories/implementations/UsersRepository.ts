import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }



  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM

    const user =  await this.repository.findOne(user_id, { relations: ["games"] })


    if(!user){
      throw Error('user not found')
    }
    return user;

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * FROM USERS ORDER BY FIRST_NAME;");
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    console.log(`SELECT * FROM USERS WHERE (upper(first_name) = upper(${first_name}) and LOWER(last_name) = LOWER(${last_name}))`)
    return this.repository.query(`SELECT * FROM USERS WHERE (upper(first_name) = upper('${first_name}') and LOWER(last_name) = LOWER('${last_name}'))`); // Complete usando raw query
  }
}
