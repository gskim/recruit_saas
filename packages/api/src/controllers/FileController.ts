import { Body, Controller, Get, Inject, Post, Query, Response, StreamableFile } from '@nestjs/common'
import { PostFilesUploadRequest, PostFilesUploadResponse } from '@recruit/interface'
import { FileService } from 'src/services/FileService'

@Controller('files')
export class FileController {
	@Inject() private readonly fileService: FileService

	@Post('upload')
	async uploadPresignedUrl(@Body() body: PostFilesUploadRequest): Promise<PostFilesUploadResponse> {
	  const { url ,key } = await this.fileService.uploadPresignedUrl(body.path, body.type)
	  return {
		  url, key
	  }
	}

	@Get('download')
	async download(
	@Query('key') key: string,
		@Query('name') name: string | null,
		@Response({ passthrough: true }) res) {
		const result = await this.fileService.download(key)
		const ext = this.fileService.getExt(key)
		const filename = name || `다운로드파일.${ext}`
		res.set({
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': `attachment; filename="${encodeURI(filename)}"`,
		  })
		return new StreamableFile(result)
	}

}