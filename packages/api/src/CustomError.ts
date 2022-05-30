export class CustomError<E> extends Error {
	constructor(code: E, message?: string) {
		super(message)
		this.name = code.toString()
		this.stack = (<any> new Error()).stack
	}
}