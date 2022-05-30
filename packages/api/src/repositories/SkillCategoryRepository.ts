import { SkillCategory } from 'src/entities/SkillCategory'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(SkillCategory)
export class SkillCategoryRepository extends BaseRepository<SkillCategory> {}