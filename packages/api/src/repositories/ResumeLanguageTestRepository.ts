import { ResumeLanguageTest } from 'src/entities/ResumeLanguageTest'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeLanguageTest)
export class ResumeLanguageTestRepository extends BaseRepository<ResumeLanguageTest> {}