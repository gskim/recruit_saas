import { Company } from 'src/entities/Company'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(Company)
export class CompanyRepository extends BaseRepository<Company> {}