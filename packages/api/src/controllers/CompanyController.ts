import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { CompanyService } from 'src/services/CompanyService'
import { GetCompaniesDetailResponse, GetCompaniesRequest, GetCompaniesResponse, PutCompaniesDetailRequest, PostCompaniesRequest,
	GetCompaniesDetailErrorCode,
	PutCompaniesDetailSkillsRequest,
	GetCompaniesDetailSkillsResponse,
	PostCompaniesDetailLogoImageRequest,
	PostCompaniesDetailLogoImageResponse } from '@recruit/interface'
import { CustomError } from 'src/CustomError'
import { FileService } from 'src/services/FileService'

@Controller('companies')
export class CompanyController {

	@Inject() private readonly companyService: CompanyService
	@Inject() private readonly fileService: FileService

	@Get()
	async getList(@Query() query: GetCompaniesRequest): Promise<GetCompaniesResponse> {
		const [itemList, totalCount] = await this.companyService.findByFilter(query.skip, query.limit, query.name)
		return {
			item_list: itemList.map((item) => this.companyService.defineCompanyModel(item)),
			total_count: totalCount,
		}
	}

	@Get(':id(\\d+)')
	async getOne(@Param('id') id: number): Promise<GetCompaniesDetailResponse> {
		const company = await this.companyService.getOne(id)
		if (!company) {
			throw new CustomError(GetCompaniesDetailErrorCode.NOT_FOUND)
		}
		return {
			item: this.companyService.defineCompanyModel(company)
		}
	}

	@Post()
	async create(@Body() body: PostCompaniesRequest) {
		await this.companyService.create(body.name_ko, body.name_en, body.address, body.email, body.tel, body.logo_img_url)
		return true
	}

	@Put(':id(\\d+)')
	async update(@Param('id') id: number, @Body() body: PutCompaniesDetailRequest) {
		await this.companyService.update(id, body.name_ko, body.name_en, body.address, body.email, body.tel, body.logo_img_url)
		return true
	}

	@Delete(':id(\\d+)')
	async delete(@Param('id') id: number) {
		await this.companyService.delete(id)
		return true
	}

	@Put(':id(\\d+)/skills')
	async updateSkills(@Param('id') id: number, @Body() body: PutCompaniesDetailSkillsRequest) {
		await this.companyService.updateSkillList(id, body.skill_list)
		return true
	}

	@Get(':id(\\d+)/skills')
	async getSkills(@Param('id') id: number): Promise<GetCompaniesDetailSkillsResponse> {
		const company = await this.companyService.getOne(id)
		if (!company) {
			throw new CustomError(GetCompaniesDetailErrorCode.NOT_FOUND)
		}
		return {
			item_list: company.skill_list
		}
	}

	@Post('logo_img_presigned_url')
	async logoImagePresignedUrl(@Body() body: PostCompaniesDetailLogoImageRequest): Promise<PostCompaniesDetailLogoImageResponse> {
		return await this.fileService.companyLogoImagePresignedUrl(body.type)
	}
}
