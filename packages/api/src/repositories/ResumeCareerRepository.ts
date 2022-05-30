import { ResumeCareer } from 'src/entities/ResumeCareer'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeCareer)
export class ResumeCareerRepository extends BaseRepository<ResumeCareer> {}