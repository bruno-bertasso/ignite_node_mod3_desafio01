import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }



  async findByTitleContaining(param: string): Promise<Game[]> {
    console.log(`title like '%${param}%'`)
     const results =  await this.repository.createQueryBuilder().where(`lower(Game.title) like '%${param}%'`).getMany();

     return results;
  //     // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('select count(*) from games'); // Complete usando raw query
  }

   async findUsersByGameId(id: string): Promise<User[]> {
     const data =  await this.repository.createQueryBuilder().relation(Game, "users").of(id).loadMany();


     return data;
  //     // Complete usando query builder
   }
}
