import { ResumeProject } from 'src/entities/ResumeProject'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeProject)
export class ResumeProjectRepository extends BaseRepository<ResumeProject> {}