import { Injectable } from '@nestjs/common'
import { RecruitModel, RecruitProcess, RecruitStatus } from '@recruit/interface'
import { Company } from 'src/entities/Company'
import { JobPost } from 'src/entities/JobPost'
import { Recruit } from 'src/entities/Recruit'
import { Resume } from 'src/entities/Resume'
import { RecruitRepository } from 'src/repositories/RecruitRepository'


@Injectable()
export class RecruitService {
	private readonly S3_URL = 'https://recruit.s3.ap-northeast-2.amazonaws.com/'
	constructor(private readonly recruitRepository: RecruitRepository) {}

	defineRecruitModel(recruit: Recruit, company: Company, jobPost: JobPost, resume: Resume) {
		const resumeProfileImage = resume.profileImage ?  this.S3_URL + resume.profileImage : null
		return new RecruitModel(recruit.id, recruit.title, recruit.description, recruit.status, recruit.process,
			{ company_id: company.id, company_name: company.name_ko },
			{ job_post_id: jobPost.id, job_post_title: jobPost.title },
			{ resume_id: resume.id, resume_name: resume.name, resume_profile_image: resumeProfileImage,
				resume_title: resume.title }
		)
	}
	async createRecruit(userId: number, title: string, resumeId: number, jobPostId: number, companyId: number, adminId: number,
		description: string | null) {
		return await this.recruitRepository.save({
			title,
			status: RecruitStatus.OPEN,
			process: RecruitProcess.서류검토,
			userId, resumeId, jobPostId, companyId, createdAdminId: adminId, updatedAdminId: adminId, description
		})
	}

	async updateRecruit(id: number, description: string | null, status: RecruitStatus,
		process: RecruitProcess, adminId: number
	) {
		await this.recruitRepository.createQueryBuilder()
			.update()
			.set({
				description,
				status,
				process,
				updatedAdminId: adminId
			})
			.where({ id })
			.execute()
		return true
	}

	async updateRecruitDescription(id: number, title: string, description: string | null, adminId: number) {
		await this.recruitRepository.createQueryBuilder()
			.update()
			.set({
				title,
				description,
				updatedAdminId: adminId
			})
			.where({ id })
			.execute()
		return true
	}

	async updateRecruitStatus(id: number, status: RecruitStatus, adminId: number) {
		await this.recruitRepository.createQueryBuilder()
			.update()
			.set({
				status,
				updatedAdminId: adminId
			})
			.where({ id })
			.execute()
		return true
	}

	async updateRecruitProcess(id: number, process: RecruitProcess, adminId: number) {
		await this.recruitRepository.createQueryBuilder()
			.update()
			.set({
				process,
				updatedAdminId: adminId
			})
			.where({ id })
			.execute()
		return true
	}

	async getRecruit(id: number) {
		return this.recruitRepository.findOne(id, {
			relations: ['resume', 'company', 'jobPost']
		})
	}

	async getRecruits(skip: number, limit: number, process: RecruitProcess | null,
		userEmail: string | null, companyId: number | null,
		status: RecruitStatus | null, title: string | null,
	) {
		const query = this.recruitRepository.createQueryBuilder('recruit')
			.leftJoinAndSelect('recruit.resume', 'resume')
			.leftJoinAndSelect('recruit.company', 'company')
			.leftJoinAndSelect('recruit.jobPost', 'jobPost')
			.skip(skip)
			.limit(limit)
			.orderBy({ 'recruit.id': 'DESC' })

		if (process) {
			query.andWhere('recruit.process = :process', { process })
		}
		if (userEmail) {
			query.andWhere('resume.email like :userEmail', { userEmail: `${userEmail}%` })
		}
		if (title) {
			query.andWhere('resume.title like :title', { title: `${title}%` })
		}
		if (companyId) {
			query.andWhere('recruit.company_id = :companyId', { companyId })
		}
		if (status) {
			query.andWhere('recruit.status = :status', { status })
		}
		return query.getManyAndCount()
	}

}