import * as crypto from 'crypto'

export default class Crypto {
	static genToken = () => {
		return crypto.randomBytes(20).toString('hex')
	}
}