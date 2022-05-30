import { ResumeEducation } from 'src/entities/ResumeEducation'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeEducation)
export class ResumeEducationRepository extends BaseRepository<ResumeEducation> {}