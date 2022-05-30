import { ResumeLicense } from 'src/entities/ResumeLicense'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(ResumeLicense)
export class ResumeLicenseRepository extends BaseRepository<ResumeLicense> {}