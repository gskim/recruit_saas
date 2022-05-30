import { ResumeDescription } from 'src/entities/ResumeDescription'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeDescription)
export class ResumeDescriptionRepository extends BaseRepository<ResumeDescription> {}