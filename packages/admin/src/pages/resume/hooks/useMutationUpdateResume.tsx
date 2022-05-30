import { updateResume } from 'api'
import { ResumeFormData } from 'components/resume/hooks/useResumeForm'
import { useMutation } from 'react-query'

const useMutationUpdateResume = () => {
    const updateMutation = useMutation((data: ResumeFormData) => {
        return updateResume(data.id!!, {
            name: data.name,
            title: data.title,
            annual_income: data.annualIncome,
            depth1_job_category_id: data.depth1JobCategory.value,
            depth2_job_category_id: data.depth2JobCategory.value,
            depth3_job_category_ids: data.depth3JobCategoryList.map((category) => category.value),
            skill_ids: data.skillList.map((skill) => skill.value),
            user_id: null,
            email: data.email,
            birthday: data.birthday,
            gender: data.gender.value,
            address: data.address,
            phone: data.phone,
            profile_image: data.profileImage,
        })
    })
    return updateMutation
}

export default useMutationUpdateResume
