import { Body, Controller, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { GetSubscribesDetailErrorCode, GetSubscribesDetailResponse, GetSubscribesRequest,
	GetSubscribesResponse, PostSubscribesErrorCode, PostSubscribesRequest,
	PutSubscribesRequest } from '@recruit/interface'
import { JwtAuthGuard } from 'src/AuthGuards'
import { CurrentUser } from 'src/CustomDecorator'
import { CustomError } from 'src/CustomError'
import { Admin } from 'src/entities/Admin'
import { CompanyService } from 'src/services/CompanyService'
import { SubscribePolicyService } from 'src/services/SubscribePolicyService'
import { SubscribeService } from 'src/services/SubscribeService'

@Controller('subscribes')
@UseGuards(JwtAuthGuard)
export class SubscribeController {

	@Inject() private readonly subscribeService: SubscribeService
	@Inject() private readonly subscribePolicyService: SubscribePolicyService
	@Inject() private readonly companyService: CompanyService

	@Post()
	async createSubscribe(@Body() body: PostSubscribesRequest, @CurrentUser() admin: Admin) {
		const company = await this.companyService.getOne(body.company_id)
		if (!company) {
			throw new CustomError(PostSubscribesErrorCode.NOT_FOUND_COMPANY)
		}
		const subscribePolicy = this.subscribePolicyService.getSubscribePolicy(body.subscribe_policy_id)
		if (!subscribePolicy) {
			throw new CustomError(PostSubscribesErrorCode.NOT_FOUND_SUBSCRIBE_POLICY)
		}
		if (body.started_at >= body.ended_at) {
			throw new CustomError(PostSubscribesErrorCode.WRONG_DATE)
		}
		await this.subscribeService.createSubscribe(company, subscribePolicy, body.started_at, body.ended_at, body.price,
			body.memo, admin.id)
		return true
	}

	@Put(':id(\\d+)')
	async updateSubscribe(@Param('id') id: number,  @Body() body: PutSubscribesRequest, @CurrentUser() admin: Admin) {
		const subscribePolicy = this.subscribePolicyService.getSubscribePolicy(body.subscribe_policy_id)
		if (!subscribePolicy) {
			throw new CustomError(PostSubscribesErrorCode.NOT_FOUND_SUBSCRIBE_POLICY)
		}
		if (body.started_at >= body.ended_at) {
			throw new CustomError(PostSubscribesErrorCode.WRONG_DATE)
		}
		await this.subscribeService.updateSubscribe(id, subscribePolicy, body.started_at, body.ended_at, body.memo, admin.id)
		return true
	}


	@Get(':id(\\d+)')
	async getSubscribe(@Param('id') id: number): Promise<GetSubscribesDetailResponse> {
		const subscribe = await this.subscribeService.getSubscribe(id)
		if (!subscribe) {
			throw new CustomError(GetSubscribesDetailErrorCode.NOT_FOUND)
		}
		const subscribePolicy = this.subscribePolicyService.getSubscribePolicy(subscribe.subscribePolicyId)
		return {
			item: this.subscribeService.defineSubscribeModel(subscribe, subscribePolicy)
		}
	}

	@Get()
	async getSubscribes(@Query() query: GetSubscribesRequest): Promise<GetSubscribesResponse> {
		const [itemList, totalCount] = await this.subscribeService.getSubscribes(query.skip, query.limit, query.company_id)
		const definedItemList = itemList.map((item) => {
			const subscribePolicy = this.subscribePolicyService.getSubscribePolicy(item.subscribePolicyId)
			return this.subscribeService.defineSubscribeModel(item, subscribePolicy)
		})
		return {
			item_list: definedItemList, total_count: totalCount
		}
	}


}
