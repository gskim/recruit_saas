import { ResumeActivity } from 'src/entities/ResumeActivity'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeActivity)
export class ResumeActivityRepository extends BaseRepository<ResumeActivity> {}