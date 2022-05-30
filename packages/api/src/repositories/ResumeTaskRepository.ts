import { ResumeTask } from 'src/entities/ResumeTask'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeTask)
export class ResumeTaskRepository extends BaseRepository<ResumeTask> {}