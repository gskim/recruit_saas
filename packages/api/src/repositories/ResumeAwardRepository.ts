import { ResumeAward } from 'src/entities/ResumeAward'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeAward)
export class ResumeAwardRepository extends BaseRepository<ResumeAward> {}