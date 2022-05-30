import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { CustomError } from 'src/CustomError'
import { EmployeeService } from 'src/services/EmployeeService'
import { GetEmployeesDetailErrorCode, GetEmployeesDetailResponse, GetEmployeesRequest, GetEmployeesResponse, PostEmployeesErrorCode,
	PostEmployeesRequest, PutEmployeesDetailRequest } from '@recruit/interface'
import { CompanyService } from 'src/services/CompanyService'

@Controller('employees')
export class EmployeeController {

	@Inject() private readonly employeeService: EmployeeService
	@Inject() private readonly companyService: CompanyService
	@Get()
	async getEmployees(@Query() query: GetEmployeesRequest): Promise<GetEmployeesResponse> {
		const [ itemList, totalCount ] = await this.employeeService.getEmployees(query.skip, query.limit, query.name, query.company_id)
		const definedList = itemList.map((item) => this.employeeService.definedEmployeeModel(item))
		return {
			total_count: totalCount, item_list: definedList
		}
	}

	@Get(':id(\\d+)')
	async getEmployee(@Param('id') id: number): Promise<GetEmployeesDetailResponse> {
		const employee = await this.employeeService.getEmployee(id)
		if (!employee) {
			throw new CustomError(GetEmployeesDetailErrorCode.NOT_FOUND)
		}
		return {
			item: this.employeeService.definedEmployeeModel(employee)
		}
	}

	@Post()
	async createEmployee(@Body() body: PostEmployeesRequest) {
		const company = await this.companyService.getOne(body.company_id)
		if (!company) {
			throw new CustomError(PostEmployeesErrorCode.NOT_FOUND_COMPANY)
		}
		await this.employeeService.createEmployee(body.name, body.phone, body.email, company)
		return true
	}

	@Put(':id(\\d+)')
	async updateEmployee(@Param('id') id: number, @Body() body: PutEmployeesDetailRequest) {
		await this.employeeService.updateEmployee(id, body.name, body.phone, body.email)
		return true
	}

	@Delete(':id(\\d+)')
	async deleteEmployee(@Param('id') id: number) {
		await this.employeeService.deleteEmployee(id)
		return true
	}
}
