import { ResumeLanguageLevel } from 'src/entities/ResumeLanguageLevel'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeLanguageLevel)
export class ResumeLanguageLevelRepository extends BaseRepository<ResumeLanguageLevel> {}