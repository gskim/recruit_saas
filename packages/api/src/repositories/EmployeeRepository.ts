import { Employee } from 'src/entities/Employee'
import { EntityRepository, Repository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'

@EntityRepository(Employee)
export class EmployeeRepository extends BaseRepository<Employee> {}