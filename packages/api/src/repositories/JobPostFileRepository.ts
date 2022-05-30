import { JobPostFile } from 'src/entities/JobPostFile'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(JobPostFile)
export class JobPostFileRepository extends BaseRepository<JobPostFile> {}