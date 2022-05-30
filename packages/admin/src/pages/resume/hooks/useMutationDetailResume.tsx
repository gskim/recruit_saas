import { upsertResumeDetail } from 'api'
import { ResumeFormData } from 'components/resume/hooks/useResumeForm'
import { useMutation } from 'react-query'

const useMutationDetailResume = () => {
    const mutaion = useMutation((data: ResumeFormData) => {
        const activities = data.activities
        const awards = data.awards
        const languagesTests = data.language_tests.map((lt) => {
            return {
                type: lt.type.value,
                score: lt.score,
                applied_at: lt.applied_at,
            }
        })
        const languageLevels = data.language_levels.map((ll) => {
            return {
                type: ll.type.value,
                grade: ll.grade.value,
            }
        })
        const educations = data.educations.map((ed) => {
            return {
                status: ed.status.value,
                type: ed.type.value,
                target_id: ed.target_id,
                name: ed.name.label,
                started_at: ed.started_at,
                ended_at: ed.ended_at,
                major: ed.major,
                score: ed.score,
            }
        })
        const links = data.links.map((link) => {
            return {
                type: link.type.value,
                original_name: link.original_name,
                key: link.key,
                url: link.url,
            }
        })

        const careers = data.careers.map((career, idx) => {
            return {
                ...career,
                order_num: idx + 1,
            }
        })
        const licenses = data.licenses.map((license) => {
            return {
                ...license,
                name: license.name.label,
            }
        })
        return upsertResumeDetail(data.id!!, {
            resume_id: data.id!!,
            careers: careers,
            activities,
            awards,
            language_tests: languagesTests,
            language_levels: languageLevels,
            educations,
            links,
            licenses,
            projects: [],
        })
    })
    return mutaion
}

export default useMutationDetailResume
