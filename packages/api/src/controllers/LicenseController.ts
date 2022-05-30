import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { GetLicensesRequest, GetLicensesResponse, PostLicensesErrorCode, PostLicensesRequest,
	PutLicensesDetailRequest, PutLicensesErrorCode } from '@recruit/interface'
import { CustomError } from 'src/CustomError'
import { LicenseService } from 'src/services/LicenseService'

@Controller('licenses')
export class LicenseController {

	@Inject() private readonly licenseService: LicenseService

	@Get()
	async getLicenses(@Query() query: GetLicensesRequest): Promise<GetLicensesResponse> {
		const [itemList, totalCount] = await this.licenseService.getLicenses(query.skip, query.limit,
			query.name, query.type, query.organization)
		return { item_list: itemList, total_count: totalCount }
	}

	@Put(':id(\\d+)')
	async updateLicense(@Param('id') id: number, @Body() body: PutLicensesDetailRequest) {
		const existLicense = await this.licenseService.getByName(body.name)
		if (existLicense) {
			throw new CustomError(PutLicensesErrorCode.EXIST_LICENSE)
		}
		await this.licenseService.updateLicense(id, body.name, body.type, body.organization)
		return true
	}


	@Delete(':id(\\d+)')
	async deleteLicense(@Param('id') id: number) {
		await this.licenseService.deleteLicense(id)
		return true
	}

	@Post()
	async addLicense(@Body() body: PostLicensesRequest) {
		const existLicense = await this.licenseService.getByName(body.name)
		if (existLicense) {
			throw new CustomError(PostLicensesErrorCode.EXIST_LICENSE)
		}
		await this.licenseService.addLicese(body.name, body.type, body.organization)
		return true
	}
}