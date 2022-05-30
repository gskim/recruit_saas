import { Controller, Get } from '@nestjs/common'
@Controller()
export class IndexController {
	@Get('health')
	async health(): Promise<boolean> {
		return true
	}
}
