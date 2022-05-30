import { Injectable } from '@nestjs/common'
import { SubscribePolicyModel, SubscribePolicyType } from '@recruit/interface'
import * as _ from 'lodash'

const subscribePolicyList: { [k: number]: SubscribePolicyModel } = {
	1: {
		id: 1,
		name: 'BASIC',
		type: SubscribePolicyType.BASIC,
		price: 1200000,
	},
	2: {
		id: 2,
		name: 'PREMIUM',
		type: SubscribePolicyType.PREMIUM,
		price: 2400000,
	}
}


@Injectable()
export class SubscribePolicyService {

	getSubscribePolicy(id: number) {
		return subscribePolicyList[id]

	}

	getSubscribePolicyList() {
		return _.values(subscribePolicyList)
	}

}