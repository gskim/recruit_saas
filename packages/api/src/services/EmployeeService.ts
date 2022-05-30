import { Injectable } from '@nestjs/common'
import { CompanyModel, EmployeeModel, EmployeeStatus } from '@recruit/interface'
import { Company } from 'src/entities/Company'
import { Employee } from 'src/entities/Employee'
import { EmployeeRepository } from 'src/repositories/EmployeeRepository'

@Injectable()
export class EmployeeService {
	constructor(private readonly employeeRepository: EmployeeRepository) {}

	definedEmployeeModel(employee: Employee) {
		const company = employee.company
		const companyModel = new CompanyModel(company.id, company.name_ko, company.name_en, company.address,
			company.status, company.email, company.tel, company.logoImgUrl)
		return new EmployeeModel(employee.id, employee.name, employee.email, employee.phone, companyModel, employee.status)
	}

	async getEmployees(skip: number, limit: number, name: string | null, companyId: number | null) {
		const query = this.employeeRepository.createQueryBuilder('employee')
			.leftJoinAndSelect('employee.company', 'company')
			.skip(skip)
			.take(limit)
		if (name) {
			query.andWhere('name LIKE :name', { name: `%${name}%` })
		}
		if (companyId) {
			query.andWhere('company_id = :companyId', { companyId })
		}
		return query.getManyAndCount()

	}

	async getEmployee(id: number) {
		return this.employeeRepository.findOne(id, { relations: ['company'] })
	}

	async createEmployee(name: string, phone: string, email: string, company: Company) {
		const employee = this.employeeRepository.create()
		employee.company = company
		employee.email = email
		employee.name = name
		employee.phone = phone
		employee.roles = []
		this.employeeRepository.save(employee)
	}

	async updateEmployee(id: number, name: string, phone: string, email: string) {
		await this.employeeRepository.createQueryBuilder()
			.update()
			.set({
				name, phone, email
			})
			.where({ id })
			.execute()
	}

	async deleteEmployee(id: number) {
		await this.employeeRepository.createQueryBuilder()
			.update()
			.set({
				status: EmployeeStatus.CLOSE
			})
			.where({ id })
			.execute()
	}
}