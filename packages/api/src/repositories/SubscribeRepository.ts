import { Subscribe } from 'src/entities/Subscribe'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(Subscribe)
export class SubscribeRepository extends BaseRepository<Subscribe> {}