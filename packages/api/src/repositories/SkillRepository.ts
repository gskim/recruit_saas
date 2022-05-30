import { Skill } from 'src/entities/Skill'
import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(Skill)
export class SkillRepository extends BaseRepository<Skill> {}