import { Injectable } from '@nestjs/common'
import { CareerType, CompanyModel, JobCategoryModel, JobPostFileModel, JobPostFileRequest, JobPostModel, JobPostProcess, JobPostStatus,
	JobPostTerminatedReason, ResumeEducationType, SkillModel } from '@recruit/interface'
import { JobPost } from 'src/entities/JobPost'
import { JobPostFileRepository } from 'src/repositories/JobPostFileRepository'
import { JobPostRepository } from 'src/repositories/JobPostRepository'

@Injectable()
export class JobPostService {
	constructor(
		private readonly jobPostRepository: JobPostRepository,
		private readonly jobPostFileRepository: JobPostFileRepository
	) {}

	defineJobPostModel(
		jobPost: JobPost, depth1JobCategoryModel: JobCategoryModel, depth2JobCategoryModel: JobCategoryModel,
		depth3JobCategoryList: JobCategoryModel[], skillList: SkillModel[], company: CompanyModel
	) {
		const files = jobPost.jobPostFiles
		const jobPostFileModels = files.map((file) => new JobPostFileModel(file.id, file.name, file.key))
		return new JobPostModel(jobPost.id, jobPost.title, jobPost.description, jobPost.terminatedReason,
			jobPost.careerType, jobPost.careerPeriod,
			jobPost.status, jobPost.startedAt, jobPost.endedAt, jobPost.linkUrl, depth1JobCategoryModel, depth2JobCategoryModel,
			depth3JobCategoryList, company, skillList, jobPost.memo,
			jobPost.minEducationType,
			jobPost.minAge,
			jobPost.maxAge,
			jobPost.minAnnualIncome,
			jobPost.maxAnnualIncome,
			jobPost.workPlace,
			jobPost.process,
			jobPost.charge,
			jobPostFileModels,
		)
	}

	async deleteJobPost(id: number) {
		await this.jobPostRepository.createQueryBuilder()
			.update()
			.set({
				status: JobPostStatus.CLOSE
			})
			.where({ id })
			.execute()
	}

	async createJobPost(data: CreateJobPostData, files: JobPostFileRequest[]) {
		const jobPost = await this.jobPostRepository.save({ ...data, jobPostFiles: files })
		files.map(async (file) => await this.jobPostFileRepository.save({ ...file, jobPostId: jobPost.id }))
		return true
	}

	async updateJobPost(id: number, data: UpdateJobPostData, files: JobPostFileRequest[]) {
		files.map(async (file) => await this.jobPostFileRepository.save({ ...file, jobPostId: id }))
		await this.jobPostRepository.save({
			id,
			...data,
			jobPostFiles: files
		})
		return true
	}

	async getJobPostsWithRelations(skip: number, limit: number, title: string | null) {
		const query = this.jobPostRepository.createQueryBuilder('jobPost')
			.leftJoinAndSelect('jobPost.depth1JobCategory', 'depth1JobCategory')
			.leftJoinAndSelect('jobPost.depth2JobCategory', 'depth2JobCategory')
			.leftJoinAndSelect('jobPost.jobPostFiles', 'jobPostFiles')
			.leftJoinAndSelect('jobPost.company', 'company')
			.skip(skip)
			.limit(limit)
			.orderBy({ 'jobPost.id': 'DESC' })

		if (title) {
			query.andWhere('jobPost.title LIKE :title', { title: `${title}%` })
		}
		return query.getManyAndCount()
	}

	async getJobPostWithRelationsById(id: number) {
		return this.jobPostRepository.findOne(id, {
			relations: ['depth1JobCategory', 'depth2JobCategory', 'company', 'jobPostFiles']
		})
	}

	async getJobPostById(id: number) {
		return this.jobPostRepository.findOne(id)
	}

}

interface CreateJobPostData { title: string, description: string, terminatedReason: JobPostTerminatedReason,
	careerType: CareerType, careerPeriod: number, status: JobPostStatus, startedAt: Date,
	endedAt: Date, linkUrl: string, depth1JobCategoryId: number, depth2JobCategoryId: number, depth3JobCategoryIds: number[],
	companyId: number, skillIds: number[], memo: string | null, minEducationType: ResumeEducationType | null,
	minAge: number | null,
	maxAge: number | null,
	minAnnualIncome: number | null,
	maxAnnualIncome: number | null,
	workPlace: string | null,
	process: JobPostProcess[],
	charge: string | null,
}

interface UpdateJobPostData { title: string, description: string, terminatedReason: JobPostTerminatedReason,
	careerType: CareerType, careerPeriod: number, startedAt: Date,
	endedAt: Date, linkUrl: string, depth1JobCategoryId: number, depth2JobCategoryId: number, depth3JobCategoryIds: number[],
	skillIds: number[], memo: string | null, minEducationType: ResumeEducationType | null,
	minAge: number | null,
	maxAge: number | null,
	minAnnualIncome: number | null,
	maxAnnualIncome: number | null,
	workPlace: string | null,
	process: JobPostProcess[],
	charge: string | null,
}