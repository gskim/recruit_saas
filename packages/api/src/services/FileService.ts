import { Injectable } from '@nestjs/common'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AdminProfileImageFileType, CompanyLogoImageFileType, FileType, SkillImageFileType } from '@recruit/interface'
import * as dayjs from 'dayjs'
import {
	PutObjectCommand,
}
	from '@aws-sdk/client-s3'
import { s3Client } from 'src/utils/S3Client'
import { S3 } from 'aws-sdk'

@Injectable()
export class FileService {

	private readonly BUCKET = 'recruit'

	async companyLogoImagePresignedUrl( type: CompanyLogoImageFileType) {

		const key = `companies/logo/${new Date().valueOf()}.${type.toString().toLowerCase()}`

		const command = new PutObjectCommand({
			Bucket: this.BUCKET,
			Key: key,
		})
		const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 })
		return {
			url: signedUrl, key,
		}
	}

	async adminProfileImagePresignedUrl( type: AdminProfileImageFileType) {

		const key = `admins/${new Date().valueOf()}.${type.toString().toLowerCase()}`

		const command = new PutObjectCommand({
			Bucket: this.BUCKET,
			Key: key,
		})
		const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 })
		return {
			url: signedUrl, key,
		}
	}

	async skillImagePresignedUrl( type: SkillImageFileType) {

		const key = `logo/${new Date().valueOf()}.${type.toString().toLowerCase()}`

		const command = new PutObjectCommand({
			Bucket: this.BUCKET,
			Key: key,
		})
		const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 })
		return {
			url: signedUrl, key,
		}
	}

	async uploadPresignedUrl(path, type: FileType) {
		const day = dayjs()
		const key = `${path}/${day.format('YYYY-MM-DD')}/${new Date().valueOf()}.${type.toString().toLowerCase()}`

		const command = new PutObjectCommand({
			Bucket: this.BUCKET,
			Key: key,
		})
		const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 })
		return {
			url: signedUrl, key,
		}
	}

	async download(key: string) {
		const s3 = new S3()
		const result = s3.getObject({
			Bucket: this.BUCKET,
			Key: key,
		}).createReadStream()
		return result
	}

	getContentType(key: string) {
		const ext = this.getExt(key)
		switch (ext) {
			case 'jpg':
				return 'application/jpeg'
			case 'png':
				return 'application/png'
			case 'pdf':
				return 'application/pdf'
			case 'hwp':
				return 'application/vnd.hancom.hwp'
			default:
				return 'application.pdf'
		}
	}
	getExt(key: string) {
		const parseKey = key.split('.')
		const ext = parseKey[parseKey.length - 1]
		return ext
	}

}