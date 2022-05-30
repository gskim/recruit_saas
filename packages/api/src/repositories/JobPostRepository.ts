import { JobPost } from 'src/entities/JobPost'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(JobPost)
export class JobPostRepository extends BaseRepository<JobPost> {}