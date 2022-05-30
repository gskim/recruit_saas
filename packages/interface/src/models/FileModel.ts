import { Type } from 'class-transformer'
import { IsArray, IsDefined, IsEmail, IsEnum, IsMobilePhone, IsNumber, IsNumberString, IsString } from 'class-validator'

export enum FileType {
	PDF = 'PDF',
	JPG = 'JPG',
	PNG = 'PNG',
	HWP = 'HWP',
}

export class FileModel {
	constructor(
		presigned_url: string,
	) {
		this.presigned_url = presigned_url
	}
	presigned_url: string
}

export class PostFilesUploadRequest {

	@IsDefined()
	@IsString()
	path: string

	@IsEnum(FileType)
	@IsDefined()
	type: FileType
}

export class PostFilesDownloadRequest {
	@IsString()
	@IsDefined()
	key: string
}

export class PostFilesUploadResponse {
	url: string
	key: string
}

export class PostFilesDownloadResponse {
	url: string
}