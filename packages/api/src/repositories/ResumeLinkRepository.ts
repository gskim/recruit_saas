import { ResumeLink } from 'src/entities/ResumeLink'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeLink)
export class ResumeLinkRepository extends BaseRepository<ResumeLink> {}