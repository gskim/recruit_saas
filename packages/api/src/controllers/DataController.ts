import { Controller, Get, Inject } from '@nestjs/common'
import * as fs from 'fs'
import { JobCategoryService } from 'src/services/JobCategoryService'
import { LicenseService } from 'src/services/LicenseService'
import { SchoolService } from 'src/services/SchoolService'
import { SkillCategoryService } from 'src/services/SkillCategoryService'
import { SkillService } from 'src/services/SkillService'
@Controller('data')
export class DataController {

	@Inject() private readonly jobCategoryService: JobCategoryService
	@Inject() private readonly skillService: SkillService
	@Inject() private readonly skillCategoryService: SkillCategoryService
	@Inject() private readonly schoolService: SchoolService
	@Inject() private readonly liecnseService: LicenseService

	@Get('job_category_migration')
	async jobCategoryMigration() {
		try {
			const json = fs.readFileSync(__dirname + '/../../job_category.json','utf8')
			const parsedJson = JSON.parse(json)
			// db insert
			for (const data1 of parsedJson) {
				const jobCategory = await this.jobCategoryService.createJobCategory(data1.name, null)
				const data1Children = data1.children
				for (const data2 of data1Children) {
					const jobCategory2 = await this.jobCategoryService.createJobCategory(data2.name, jobCategory.id)
					const data2Children = data2.children
					for (const data3 of data2Children) {
						const jobCategory3 = await this.jobCategoryService.createJobCategory(data3.name, jobCategory2.id)
					}
				}
			}
			return parsedJson
		} catch (error) {
			console.log(error)
		}

	}

	@Get('skill_migration')
	async skillMigration() {
		try {
			const json = fs.readFileSync(__dirname + '/../../tech_stack.json','utf8')
			const parsedJson = JSON.parse(json)
			// db insert
			for (const data of parsedJson) {
				const categoryName = data.category
				const skillCategory = await this.skillCategoryService.getSkillCategoryByName(categoryName)
				let skillCategoryId = 0
				if (!skillCategory) {
					const newSkillCategory = await this.skillCategoryService.createSkillCategory(categoryName)
					skillCategoryId = newSkillCategory.id
				} else {
					skillCategoryId = skillCategory.id
				}
				const alias = data.alias ? data.alias.split(',') : []
				await this.skillService.createSkill(
					skillCategoryId, data.name, alias, data.description, data.website_url, `logo/${data.tech_stack_id}.png`
				)
			}
			return true
		} catch (error) {
			console.log(error)
		}
	}

	@Get('license_migration')
	async licenseMigration() {
		try {
			const json = fs.readFileSync(__dirname + '/../../license.json','utf8')
			const parsedJson: License[] = JSON.parse(json)
			// db insert
			for (const data of parsedJson) {
				await this.liecnseService.addLicenseForMigation(data.ID, data.구분, data.자격증명, data.발급기관)
			}
			return true
		} catch (error) {
			console.log(error)
		}
	}

	@Get('school_migration')
	async schoolMigration() {
		try {
			const json = fs.readFileSync(__dirname + '/../../school.json','utf8')
			const parsedJson: School[] = JSON.parse(json)
			// db insert
			for (const data of parsedJson) {
				await this.schoolService.addSchoolForMigration(data.구분, data.카테고리, data.학교명)
			}
			return true
		} catch (error) {
			console.log(error)
		}
	}
}

type License = {
	ID: number
	구분: string
	자격증명: string
	발급기관: string
}

type School = {
	구분: string
	카테고리: string
	학교명: string
}