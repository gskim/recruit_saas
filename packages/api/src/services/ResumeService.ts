import { Injectable } from '@nestjs/common'
import { JobCategoryModel, PostResumesDetailActivitiesRequest, PostResumesDetailAwardsRequest, PostResumesDetailCareersRequest,
	PostResumesDetailDescriptionsRequest,
	PostResumesDetailEducationsRequest,
	PostResumesDetailLanguageLevelsRequest, PostResumesDetailLanguageTestsRequest,
	PostResumesDetailLicensesRequest,
	PostResumesDetailLinksRequest,
	PostResumesDetailProjectsRequest,
	PostResumesDetailTasksRequest,
	ResumeActivityModel,
	ResumeAwardModel,
	ResumeCareerModel, ResumeDescriptionModel, ResumeEducationModel, ResumeEducationType, ResumeLanguageLevelModel,
	ResumeLanguageLevelType,
	ResumeLanguageTestModel, ResumeLicenseModel, ResumeLinkModel, ResumeModel,
	ResumeProjectModel, ResumeTaskModel, SkillModel, UserModel } from '@recruit/interface'
import { ResumeCareer } from 'src/entities/ResumeCareer'
import { ResumeCareerRepository } from 'src/repositories/ResumeCareerRepository'
import { ResumeRepository } from 'src/repositories/ResumeRepository'
import * as dayjs from 'dayjs'
import { ResumeLicenseData } from 'src/entities/ResumeLicense'
import { ResumeLicenseRepository } from 'src/repositories/ResumeLicenseRepository'
import { ResumeLanguageTestRepository } from 'src/repositories/ResumeLanguageTestRepository'
import { ResumeLanguageLevelRepository } from 'src/repositories/ResumeLanguageLevelRepository'
import { ResumeTaskRepository } from 'src/repositories/ResumeTaskRepository'
import { ResumeProjectRepository } from 'src/repositories/ResumeProjectRepository'
import { ResumeLinkRepository } from 'src/repositories/ResumeLinkRepository'
import { ResumeEducationRepository } from 'src/repositories/ResumeEducationRepository'
import { ResumeDescriptionRepository } from 'src/repositories/ResumeDescriptionRepository'
import { ResumeAwardRepository } from 'src/repositories/ResumeAwardRepository'
import { ResumeActivityRepository } from 'src/repositories/ResumeActivityRepository'
import { ResumeLanguageTestData } from 'src/entities/ResumeLanguageTest'
import { ResumeLanguageLevelData } from 'src/entities/ResumeLanguageLevel'
import { ResumeActivityData } from 'src/entities/ResumeActivity'
import { ResumeAwardData } from 'src/entities/ResumeAward'
import { ResumeDescription } from 'src/entities/ResumeDescription'
import { ResumeEducationData } from 'src/entities/ResumeEducation'
import { ResumeLinkData } from 'src/entities/ResumeLink'
import { ResumeProjectData } from 'src/entities/ResumeProject'
import { ResumeTask } from 'src/entities/ResumeTask'
import * as _ from 'lodash'
import { Resume } from 'src/entities/Resume'
import { Brackets } from 'typeorm'


@Injectable()
export class ResumeService {
	private readonly S3_URL = 'https://recruit.s3.ap-northeast-2.amazonaws.com/'
	constructor(
		private readonly resumeRepository: ResumeRepository,
		private readonly resumeCareerRepository: ResumeCareerRepository,
		private readonly resumeLicenseRepository: ResumeLicenseRepository,
		private readonly resumeLanguageTestRepository: ResumeLanguageTestRepository,
		private readonly resumeActivityRepository: ResumeActivityRepository,
		private readonly resumeAwardRepository: ResumeAwardRepository,
		private readonly resumeDescriptionRepository: ResumeDescriptionRepository,
		private readonly resumeEducationRepository: ResumeEducationRepository,
		private readonly resumeLinkRepository: ResumeLinkRepository,
		private readonly resumeProjectRepository: ResumeProjectRepository,
		private readonly resumeTaskRepository: ResumeTaskRepository,
		private readonly resumeLanguageLevelRepository: ResumeLanguageLevelRepository,
	) {}

	definedResumeModel(resume: Resume, depth1JobCategoryModel: JobCategoryModel, depth2JobCategoryModel: JobCategoryModel,
		depth3JobCategoryList: JobCategoryModel[], skillList: SkillModel[]) {
		const _user = resume.user
		const userModel = _user ? new UserModel(_user.id, _user.email, _user.status) : null
		const profileImage = resume.profileImage ? this.S3_URL + resume.profileImage : null
		return new ResumeModel(resume.id,
			resume.name, resume.title, resume.email, resume.birthday, resume.gender, resume.address,
			resume.phone, profileImage,
			resume.status, depth1JobCategoryModel,
			depth2JobCategoryModel, depth3JobCategoryList, skillList, resume.annualIncome, userModel)
	}

	async getResumes(skip: number, limit: number,
		username?: string,
		email?: string,
		skillIdList?: number[],
		depth1JobCategoryId?: number,
		depth2JobCategoryId?: number,
		depth3JobCategoryIdList?: number[],
		educationLastType?: ResumeEducationType,
		age?: number,
		licenseId?: number,
		schoolId?: number,
		languageLevelType?: ResumeLanguageLevelType,
		languageLevelGrade?: string,
		title?: string | null
	) {
		const query = this.resumeRepository.createQueryBuilder('resume')
			.leftJoinAndSelect('resume.depth1JobCategory', 'depth1JobCategory')
			.leftJoinAndSelect('resume.depth2JobCategory', 'depth2JobCategory')
			.leftJoinAndSelect('resume.resumeEducation', 'education')
			.leftJoinAndSelect('resume.resumeLicense', 'license')
			.leftJoinAndSelect('resume.resumeLanguageLevel', 'languageLevel')
			.skip(skip)
			.take(limit)
			.orderBy({
				'resume.id': 'DESC'
			})
		if (title) {
			query.andWhere('resume.title LIKE :title', { title: `${title}%` })
		}

		if (username) {
			query.andWhere('resume.name LIKE :username', { username: `${username}%` })
		}
		if (email) {
			query.andWhere('email LIKE :email', { email: `${email}%` })
		}
		if (skillIdList && skillIdList.length) {
			query.andWhere(new Brackets((qb) => {
				skillIdList.map((skillId) => {
					qb.orWhere(`JSON_CONTAINS(skill_ids, '${skillId}', '$')`)
				})
			}))
		}
		if (depth1JobCategoryId) {
			query.andWhere('depth1_job_category_id = :depth1JobCategoryId', { depth1JobCategoryId })
		}
		if (depth2JobCategoryId) {
			query.andWhere('depth2_job_category_id = :depth2JobCategoryId', { depth2JobCategoryId })
		}
		if (depth3JobCategoryIdList && depth3JobCategoryIdList.length) {
			query.andWhere(new Brackets((qb) => {
				depth3JobCategoryIdList.map((depth3CategoryId) => {
					qb.orWhere(`JSON_CONTAINS(depth3_job_category_ids, '${depth3CategoryId}', '$')`)
				})
			}))
		}
		if (educationLastType) {
			query.andWhere('education.last_type = :educationLastType', { educationLastType })
		}
		if (licenseId) {
			query.andWhere("JSON_CONTAINS(license.license_ids, :licenseId, '$')", { licenseId })
		}

		if (schoolId) {
			query.andWhere("JSON_CONTAINS(education.target_ids, :schoolId, '$')", { schoolId })
		}

		if (languageLevelType && languageLevelGrade) {
			query.andWhere(
				"JSON_CONTAINS(languageLevel.data, JSON_OBJECT('type', :type, 'grade', :grade), '$')",
				{ type: languageLevelType, grade: languageLevelGrade })
		}

		return query.getManyAndCount()
	}

	async createResume(
		userId: number, depth1: number, depth2: number, depth3List: number[], skillIds: number[],
		annualIncome: number | null,
		email: string, name: string, address: string | null, phone: string | null, gender: string,
		profileImage: string | null, title: string
	) {
		return await this.resumeRepository.save({
			title,
			userId,
			depth1JobCategoryId: depth1,
			depth2JobCategoryId: depth2,
			depth3JobCategoryIds: depth3List,
			skillIds,
			annualIncome,
			name, email, address, phone, gender, profileImage,
		})
	}

	async updateResume(resumeId: number, userId: number, depth1: number, depth2: number,
		depth3List: number[], skillIds: number[],
		annualIncome: number | null,
		email: string, name: string, address: string | null, phone: string | null, gender: string,
		profileImage: string | null, birthday: string | null, title: string
	) {
		return await this.resumeRepository.save({
			title,
			id: resumeId,
			userId,
			depth1JobCategoryId: depth1,
			depth2JobCategoryId: depth2,
			depth3JobCategoryIds: depth3List,
			skillIds,
			annualIncome,
			name, email, address, phone, gender, profileImage,
			birthday,
		})
	}


	async getResume(id: number)  {
		return this.resumeRepository.findOne(id, { relations: ['depth1JobCategory', 'depth2JobCategory'] })
	}

	async deleteCareer(resumeId: number, willNotDeleteIds: number[]) {
		const careers = await this.resumeCareerRepository.find({ where: { resumeId } })
		const willDeleteCareerIds = careers.filter((career) => !willNotDeleteIds.includes(career.id) ).map((career) => career.id)
		if (willDeleteCareerIds.length) {
			await this.resumeCareerRepository.softDelete(willDeleteCareerIds)
		}
	}

	async upsertCareer(resumeId: number, data: PostResumesDetailCareersRequest) {
		const careerId = data.id
		let career: ResumeCareer
		if (careerId) {
			career = await this.resumeCareerRepository.findOne(careerId)
		} else {
			career = this.resumeCareerRepository.create()
			career.resumeId = resumeId
			career.companyName = data.company_name

		}
		career.orderNum = data.order_num
		const resumeData = _.pick(data, ['company_description', 'organization', 'charge', 'started_at', 'ended_at'])
		const career_period_months = resumeData.ended_at ? dayjs(resumeData.ended_at).diff(resumeData.started_at, 'months') : null
		career.data = { ...resumeData, career_period_months }
		return await this.resumeCareerRepository.save(career)
	}

	async getCareers(resumeId: number) {
		const careers = await this.resumeCareerRepository.find(
			{
				relations: ['tasks'],
				where: { resumeId },
			}
		)
		return careers.map((career) => {
			const data = career.data
			const startedAt = new Date(data.started_at)
			const endedAt = data.ended_at ? new Date(data.ended_at) : null
			const period = dayjs(endedAt ? endedAt : new Date()).diff(startedAt, 'months')
			const tasks = career.tasks.map((task) => {
				const taskData = task.data
				return new ResumeTaskModel(task.id, taskData.title, taskData.description)
			})
			return new ResumeCareerModel(career.id, startedAt, endedAt, career.companyName, data.company_description,
				data.organization, data.charge, period, tasks)
		})
	}

	async upsertLicense(resumeId: number, dataList: PostResumesDetailLicensesRequest[]) {
		let license = await this.resumeLicenseRepository.findOne({ where: { resumeId } })
		if (!license) {
			license = this.resumeLicenseRepository.create()
			license.resumeId = resumeId
		}
		const data: ResumeLicenseData[] =  dataList.map((data) => {
			const jsonData: ResumeLicenseData = {
				...data,
			}
			return jsonData
		})
		license.data = data
		license.licenseIds = data.filter((v) => v.license_id).map((v) => v.license_id)
		await this.resumeLicenseRepository.save(license)
	}

	async getLicenses(resumeId: number) {
		const license = await this.resumeLicenseRepository.findOne({ where: { resumeId } })
		const dataList = license ? license.data : []
		return dataList.map((data) => {
			return new ResumeLicenseModel(data.license_id, data.name, new Date(data.applied_at), data.organization)
		})
	}

	async upsertLanguageTest(resumeId: number, dataList: PostResumesDetailLanguageTestsRequest[]) {
		let item = await this.resumeLanguageTestRepository.findOne({ where: { resumeId } })
		if (!item) {
			item = this.resumeLanguageTestRepository.create()
			item.resumeId = resumeId
		}
		const data: ResumeLanguageTestData[] =  dataList.map((data) => {
			const jsonData: ResumeLanguageTestData = {
				...data,
			}
			return jsonData
		})
		item.data = data
		item.types = data.map((d) => d.type)
		await this.resumeLanguageTestRepository.save(item)
	}

	async getLanguageTests(resumeId: number) {
		const item = await this.resumeLanguageTestRepository.findOne({ where: { resumeId } })
		const dataList = item ? item.data : []
		return dataList.map((data) => {
			return new ResumeLanguageTestModel(data.type, data.score, new Date(data.applied_at))
		})
	}

	async upsertLanguageLevel(resumeId: number, dataList: PostResumesDetailLanguageLevelsRequest[]) {
		let item = await this.resumeLanguageLevelRepository.findOne({ where: { resumeId } })
		if (!item) {
			item = this.resumeLanguageLevelRepository.create()
			item.resumeId = resumeId
		}
		const data: ResumeLanguageLevelData[] =  dataList.map((data) => {
			const jsonData: ResumeLanguageLevelData = {
				...data,
			}
			return jsonData
		})
		item.data = data
		await this.resumeLanguageLevelRepository.save(item)
	}

	async getLanguageLevels(resumeId: number) {
		const item = await this.resumeLanguageLevelRepository.findOne({ where: { resumeId } })
		const dataList = item ? item.data : []
		return dataList.map((data) => {
			return new ResumeLanguageLevelModel(data.type, data.grade)
		})
	}

	async upsertActiviy(resumeId: number, dataList: PostResumesDetailActivitiesRequest[]) {
		let item = await this.resumeActivityRepository.findOne({ where: { resumeId } })
		if (!item) {
			item = this.resumeActivityRepository.create()
			item.resumeId = resumeId
		}
		const data: ResumeActivityData[] =  dataList.map((data) => {
			const jsonData: ResumeActivityData = {
				...data,
			}
			return jsonData
		})
		item.data = data
		await this.resumeActivityRepository.save(item)
	}

	async getActivities(resumeId: number) {
		const item = await this.resumeActivityRepository.findOne({ where: { resumeId } })
		const dataList = item ? item.data : []
		return dataList.map((data) => {
			return new ResumeActivityModel(data.title, data.description, new Date(data.started_at), new Date(data.ended_at))
		})
	}

	async upsertAward(resumeId: number, dataList: PostResumesDetailAwardsRequest[]) {
		let item = await this.resumeAwardRepository.findOne({ where: { resumeId } })
		if (!item) {
			item = this.resumeAwardRepository.create()
			item.resumeId = resumeId
		}
		const data: ResumeAwardData[] =  dataList.map((data) => {
			const jsonData: ResumeAwardData = {
				...data,
			}
			return jsonData
		})
		item.data = data
		await this.resumeAwardRepository.save(item)
	}

	async getAwards(resumeId: number) {
		const item = await this.resumeAwardRepository.findOne({ where: { resumeId } })
		const dataList = item ? item.data : []
		return dataList.map((data) => {
			return new ResumeAwardModel(data.title, data.description, new Date(data.dated_at))
		})
	}

	async deleteDescription(resumeId: number, willNotDeleteIds: number[]) {
		const descriptions = await this.resumeDescriptionRepository.find({ where: { resumeId } })
		const willDeleteDescriptionIds = descriptions
			.filter((description) => !willNotDeleteIds.includes(description.id) )
			.map((description) => description.id)
		await this.resumeDescriptionRepository.softDelete(willDeleteDescriptionIds)
	}

	async upsertDescription(resumeId: number, data: PostResumesDetailDescriptionsRequest, orderNum: number) {
		const descriptionId = data.id
		let description: ResumeDescription
		if (descriptionId) {
			description = await this.resumeDescriptionRepository.findOne(descriptionId)
		} else {
			description = this.resumeDescriptionRepository.create()
			description.resumeId = resumeId
		}
		description.orderNum = orderNum
		const descriptionData = _.pick(data, ['title', 'content'])
		description.data = descriptionData
		await this.resumeDescriptionRepository.save(description)
	}

	async getDescriptions(resumeId: number) {
		const descriptions = await this.resumeDescriptionRepository.find({ where: { resumeId } })
		return descriptions.map((description) => {
			const data= description.data
			return new ResumeDescriptionModel(description.id, data.title, data.content)
		})
	}

	async upsertEducation(resumeId: number, dataList: PostResumesDetailEducationsRequest[]) {
		let item = await this.resumeEducationRepository.findOne({ where: { resumeId } })
		if (!item) {
			item = this.resumeEducationRepository.create()
			item.resumeId = resumeId
		}
		const data: ResumeEducationData[] =  dataList.map((data) => {
			const jsonData: ResumeEducationData = {
				...data,
			}
			return jsonData
		})
		item.data = data
		item.targetIds = data.map((i) => i.target_id).filter((i) => i)
		item.lastType = this.getEducationLastType(dataList)
		await this.resumeEducationRepository.save(item)
	}

	async getEducations(resumeId: number) {
		const item = await this.resumeEducationRepository.findOne({ where: { resumeId } })
		const dataList = item ? item.data : []
		return dataList.map((data) => {
			return new ResumeEducationModel(
				data.status, data.type, data.target_id, data.name, new Date(data.started_at), new Date(data.ended_at),
				data.major, data.score
			)
		})
	}

	async upsertLink(resumeId: number, dataList: PostResumesDetailLinksRequest[]) {
		let item = await this.resumeLinkRepository.findOne({ where: { resumeId } })
		if (!item) {
			item = this.resumeLinkRepository.create()
			item.resumeId = resumeId
		}
		const data: ResumeLinkData[] =  dataList.map((data) => {
			const jsonData: ResumeLinkData = {
				...data,
			}
			return jsonData
		})
		item.data = data
		item.types = data.map((v) => v.type)
		await this.resumeLinkRepository.save(item)
	}

	async getLinks(resumeId: number) {
		const item = await this.resumeLinkRepository.findOne({ where: { resumeId } })
		const dataList = item ? item.data : []
		return dataList.map((data) => {
			return new ResumeLinkModel(
				data.type, data.url, data.original_name, data.key
			)
		})
	}

	async upsertProject(resumeId: number, dataList: PostResumesDetailProjectsRequest[]) {
		let item = await this.resumeProjectRepository.findOne({ where: { resumeId } })
		if (!item) {
			item = this.resumeProjectRepository.create()
			item.resumeId = resumeId
		}
		const data: ResumeProjectData[] =  dataList.map((data) => {
			const jsonData: ResumeProjectData = {
				...data,
			}
			return jsonData
		})
		item.data = data
		await this.resumeProjectRepository.save(item)
	}

	async getProjects(resumeId: number) {
		const item = await this.resumeProjectRepository.findOne({ where: { resumeId } })
		const dataList = item.data
		return dataList.map((data) => {
			return new ResumeProjectModel(
				data.title, data.description, new Date(data.started_at), new Date(data.ended_at)
			)
		})
	}

	async deleteTask(resumeId: number, resumeCareerId: number, willNotDeleteIds: number[]) {
		const tasks = await this.resumeTaskRepository.find({ where: { resumeId, resumeCareerId } })
		const willDeleteTaskIds = tasks.filter((task) => !willNotDeleteIds.includes(task.id) ).map((task) => task.id)
		await this.resumeTaskRepository.softDelete(willDeleteTaskIds)
	}

	async upsertTask(resumeId: number, resumeCareerId: number, data: PostResumesDetailTasksRequest, orderNum: number) {
		const taskId = data.id
		let task: ResumeTask
		if (taskId) {
			task = await this.resumeTaskRepository.findOne(taskId)
		} else {
			task = this.resumeTaskRepository.create()
			task.resumeId = resumeId
			task.careerId = resumeCareerId
		}
		task.orderNum = orderNum
		const taskData = _.pick(data, ['title', 'description'])
		task.data = taskData
		await this.resumeTaskRepository.save(task)
	}

	async getTasks(resumeId: number, resumeCareerId: number) {
		const tasks = await this.resumeTaskRepository.find({ where: { resumeId, resumeCareerId } })
		return tasks.map((task) => {
			const data = task.data
			return new ResumeTaskModel(
				task.id, data.title, data.description
			)
		})
	}

	private getEducationLastType(educations: PostResumesDetailEducationsRequest[]) {
		let lastType = ResumeEducationType.고등학교
		for (const education of educations) {
			const type = education.type
			if (type === ResumeEducationType.대학원) {
				return ResumeEducationType.대학원
			} else if (type === ResumeEducationType.대학교) {
				lastType = type
			}
		}
		return lastType

	}

}