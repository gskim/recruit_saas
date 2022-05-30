import {
    AdminRole,
    AdminStatus,
    CareerType,
    EmployeeStatus,
    JobPostProcess,
    JobPostTerminatedReason,
    RecruitProcess,
    RecruitStatus,
    ResumeEducationStatus,
    ResumeEducationType,
    ResumeLanguageLevelType,
    ResumeLanguageTestType,
    ResumeLinkType,
    SubscribePolicyType,
} from '@recruit/interface'
import _ from 'lodash'

export const adminStatusOptions = [
    { value: AdminStatus.APPROVE, label: AdminStatus.APPROVE },
    { value: AdminStatus.DELETE, label: AdminStatus.DELETE },
    { value: AdminStatus.REJECT, label: AdminStatus.REJECT },
    { value: AdminStatus.WAIT, label: AdminStatus.WAIT },
]

export const adminRoleOptions = [
    { value: AdminRole.ADMIN, label: AdminRole.ADMIN },
    { value: AdminRole.NORMAL, label: AdminRole.NORMAL },
]

export const employeeStatusOptions = [
    { value: EmployeeStatus.OPEN, label: EmployeeStatus.OPEN },
    { value: EmployeeStatus.CLOSE, label: EmployeeStatus.CLOSE },
]

export const subscribePolicyOptions = [
    { value: 1, label: SubscribePolicyType.BASIC },
    { value: 2, label: SubscribePolicyType.PREMIUM },
]

export const languageTestTypeOptions = _.map(ResumeLanguageTestType, (v) => {
    return { value: v, label: v }
})

export const languageLevelTypeOptions = _.map(ResumeLanguageLevelType, (v) => {
    return { value: v, label: v }
})

export const educationStatusOptions = _.map(ResumeEducationStatus, (v) => {
    return { value: v, label: v }
})

export const linkTypeOptions = _.map(ResumeLinkType, (v) => {
    return { value: v, label: v }
})

export const recruitStatusOptions = _.map(RecruitStatus, (v) => {
    return { value: v, label: v }
})

export const recruitProcessOptions = _.map(RecruitProcess, (v) => {
    return { value: v, label: v }
})

export const languageLevelGradeOptions = [
    { value: '상', label: '상' },
    { value: '중', label: '중' },
    { value: '하', label: '하' },
]

export const skillCategoryOptions = [
    { value: 1, label: '협업툴' },
    { value: 2, label: '데이터' },
    { value: 3, label: '모바일' },
    { value: 4, label: '프론트엔드' },
    { value: 5, label: '데브옵스' },
    { value: 6, label: '백엔드' },
    { value: 7, label: '테스팅툴' },
    { value: 8, label: '데이터베이스' },
    { value: 9, label: '언어' },
]

export const careerTypeOptions = [
    { value: CareerType.신입, label: CareerType.신입 },
    { value: CareerType.경력, label: CareerType.경력 },
    { value: CareerType['신입/경력'], label: CareerType['신입/경력'] },
]

export const jobPostTerminatedReasonOptions = [
    { value: JobPostTerminatedReason.기간만료시, label: JobPostTerminatedReason.기간만료시 },
    { value: JobPostTerminatedReason.상시채용, label: JobPostTerminatedReason.상시채용 },
    { value: JobPostTerminatedReason.채용시까지, label: JobPostTerminatedReason.채용시까지 },
]

export const jobPostProcessOptions = [
    { value: JobPostProcess.서류검토, label: JobPostProcess.서류검토 },
    { value: JobPostProcess.사전과제, label: JobPostProcess.사전과제 },
    { value: JobPostProcess.인성, label: JobPostProcess.인성 },
    { value: JobPostProcess['1차면접'], label: JobPostProcess['1차면접'] },
    { value: JobPostProcess['2차면접'], label: JobPostProcess['2차면접'] },
]

export const educationTypeOptions = [
    { value: ResumeEducationType.고등학교, label: ResumeEducationType.고등학교 },
    { value: ResumeEducationType.대학교, label: ResumeEducationType.대학교 },
    { value: ResumeEducationType.대학원, label: ResumeEducationType.대학원 },
    { value: ResumeEducationType.기관, label: ResumeEducationType.기관 },
]

export type CommonOption<T> = {
    value: T
    label: T
}

export type AdminStatusOption = {
    value: AdminStatus
    label: AdminStatus
}

export type AdminRoleOption = {
    value: AdminRole
    label: AdminRole
}

export type SkillCategoryOption = {
    value: number
    label: string
}

export type EmployeeStatusOption = {
    value: EmployeeStatus
    label: EmployeeStatus
}

export type CompanySearchOption = {
    value: number
    label: string
}

export type JobPostSearchOption = {
    value: number
    label: string
}

export type ResumeSearchOption = {
    value: number
    label: string
}

export type SubscribeSearchOption = {
    value: number
    label: string
}

export type LicenseSearchOption = {
    value: number
    label: string
}

export type SchoolSearchOption = {
    value: number
    label: string
}
