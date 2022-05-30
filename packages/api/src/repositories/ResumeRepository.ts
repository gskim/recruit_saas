import { Resume } from 'src/entities/Resume'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(Resume)
export class ResumeRepository extends BaseRepository<Resume> {
}