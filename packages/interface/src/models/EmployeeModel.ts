import { IsDefined, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'
import { CompanyModel } from './CompanyModel'

export enum EmployeeStatus {
	OPEN = 'OPEN',
	CLOSE = 'CLOSE',
}

export class EmployeeModel {
	constructor(
		id: number,
		name: string,
		email: string,
		phone: string,
		company: CompanyModel,
		status: EmployeeStatus
	) {
		this.id = id
		this.name = name
		this.email = email
		this.phone = phone
		this.company = company
		this.status = status
	}
	id: number
	name: string
	email: string
	phone: string
	company: CompanyModel
	status: EmployeeStatus
}

export class GetEmployeesRequest {
	@IsNumberString()
	@IsDefined()
	skip: number

	@IsNumberString()
	@IsDefined()
	limit: number

	@IsNumberString()
	@IsOptional()
	company_id: number | null

	@IsString()
	@IsOptional()
	name: string | null
}

export class GetEmployeesResponse {
	item_list: EmployeeModel[]
	total_count: number
}

export class PutEmployeesDetailRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsString()
	@IsDefined()
	phone: string

	@IsString()
	@IsDefined()
	email: string
}

export class PostEmployeesRequest {
	@IsString()
	@IsDefined()
	name: string

	@IsString()
	@IsDefined()
	phone: string

	@IsString()
	@IsDefined()
	email: string


	@IsNumber()
	@IsDefined()
	company_id: number
}

export class GetEmployeesDetailResponse {
	item: EmployeeModel
}
