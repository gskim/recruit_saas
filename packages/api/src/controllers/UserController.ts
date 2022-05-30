import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { GetUsersDetailErrorCode, GetUsersDetailResponse, GetUsersRequest, GetUsersResponse,
	PostUsersRequest, PutUsersDetailRequest } from '@recruit/interface'
import { CustomError } from 'src/CustomError'

import { UserService } from 'src/services/UserService'
@Controller('users')
export class UserController {

	@Inject() private readonly userService: UserService

	@Post()
	async createUser(@Body() body: PostUsersRequest) {
		await this.userService.createUser(body.email)
		return true
	}

	@Put(':id(\\d+)')
	async updateUser(@Param('id') id: number,  @Body() body: PutUsersDetailRequest) {
		await this.userService.updateUser(id, body.email)
		return true
	}


	@Get(':id(\\d+)')
	async getUser(@Param('id') id: number): Promise<GetUsersDetailResponse> {
		const user = await this.userService.getUser(id)
		if (!user) {
			throw new CustomError(GetUsersDetailErrorCode.NOT_FOUND)
		}
		return {
			item: this.userService.definedUserModel(user)
		}
	}

	@Get()
	async getUsers(@Query() query: GetUsersRequest): Promise<GetUsersResponse> {
		const [ users, totalCount] = await Promise.all([
			this.userService.getUsers(query.skip, query.limit),
			this.userService.getTotalCount()
		])
		return {
			item_list: users.map((user) => this.userService.definedUserModel(user)),
			total_count: totalCount,
		}
	}

	@Delete(':id(\\d+)')
	async deleteUser(@Param('id') id: number) {
		await this.userService.deleteUser(id)
		return true
	}
}
